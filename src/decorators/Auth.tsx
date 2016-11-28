import * as React from 'react'
import { bindActionCreators } from 'redux'
import * as AuthActions from '../actions/identity'
import {connect} from 'react-redux'

import { loginUrl, authToken, callbackUrlStorage } from 'config'

const moment = require('moment')

import * as HWUtils from 'bss-hw-api'

const REDIRECT_TIME = 2000

export default class Auth {

    static container(DecoratedComponent): typeof DecoratedComponent {

        const displayName =
            DecoratedComponent.displayName ||
            DecoratedComponent.name ||
            'Component'

        @connect()
        class AuthHandler extends React.Component<any, any> {

            static displayName = `AuthHandler(${displayName})`

            private actions: typeof AuthActions

            constructor(props) {
                super()
                this.actions = bindActionCreators(AuthActions, props.dispatch)
            }

            navigate(route: string) {
                this.props.history.pushState(null, route, null)
            }

            navigateToLogin() {
                // Before going back, save the current URL
                if (!localStorage.getItem(callbackUrlStorage)) {
                    let currentUrl = window.location.pathname + window.location.hash
                    localStorage.setItem(callbackUrlStorage, currentUrl)
                }
                window.location.href = loginUrl
            }

            isTokenValid(): boolean {

                // Get token from state
                let token = localStorage.getItem(authToken)

                // If no token redirect to the /login
                if (!token) {
                  return false
                }

                // Check for token expiration
                let jwt = HWUtils.decodeToken(token)
                const expDate = moment.unix(jwt.exp)
                const now = moment(new Date())

                // Is token expired?
                if (expDate.unix() - now.unix() <= 0) {
                  return false
                }

                return true
            }

            /**
            * Check always for token expiration to redirect to login
            * in case of not found or token expired
            */
            checkAuth(): boolean {
                let isTokenValid = this.isTokenValid()

                if (!isTokenValid) {
                  this.navigateToLogin()
                }

                setTimeout(() => {
                  this.checkAuth()
                }, REDIRECT_TIME )

                return isTokenValid
            }

            emitTokenUpdate(action: HWUtils.TokenAction) {
                if (action.type == HWUtils.TOKEN_UPDATED) {
                  this.actions.setToken(action.token)
                }
            }

            componentDidMount() {
                // Subscribe to auth tokens from HW API
                //HW.subscribe(this.emitTokenUpdate.bind(this))
                this.checkAuth()
            }

            render() {
                return this.isTokenValid()
                    ? <DecoratedComponent {...this.props} />
                    : <span>No session, redirecting to login page.</span>
            }
        }

        return AuthHandler;
    }
}
