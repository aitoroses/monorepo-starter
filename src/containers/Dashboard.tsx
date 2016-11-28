
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Auth from '../decorators/Auth'

import Create from '../components/Create'
import { userIdSelector } from '../selectors/userProfile'
import { createRequest } from '../actions/create'

import { Maybe } from 'tsmonad'

export interface IProps {}

@Auth.container
@connect(userIdSelector, {
    createRequest
})
class DashboardContainer extends React.Component<IProps, any> {

    render() {
        return (
            <div>Welcome to the app!</div>
        )
    }
}

export default DashboardContainer
