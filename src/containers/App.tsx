
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'

import { authSelector } from '../selectors/index'

export interface IProps {
    auth
    children
}

@connect(authSelector)
class App extends React.Component<IProps, any> {

    render() {
        return (
            <div>
                <ul>
                    <li>
                    {this.props.auth.loggedIn ? (
                            <div>{this.props.auth.username}<Link to="/logout">Log out</Link> </div>
                        ) : (
                            <Link to="/login">Sign in</Link>
                        )}
                    </li>
                </ul>
                    {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
            </div>
        )
    }
}

export default App
