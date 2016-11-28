
import * as React from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { bindActionCreators } from 'redux'

@connect()
export default class Login extends React.Component<any, any> {

    render() {
        return (
            <div>Login</div>
        )
    }
}
