
import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Create from '../components/Create'
import { userIdSelector } from '../selectors/userProfile'
import { createRequest } from '../actions/create'

import { Maybe } from 'tsmonad'

export interface IProps {}

@connect()
class LoginForm extends React.Component<IProps, any> {

    state = {
        username: '',
        password: ''
    }

    _changeUsername (event) {
        this.state.username = event.target.value
    }

    _changePassword (event) {
        this.state.password = event.target.value
    }

    _onSubmit (event) {
        event.preventDefault()
        console.log('send login')
    }

    render() {
        return (
            <form className='form' onSubmit={this._onSubmit}>
                {error ? error : null}
                <div className='form__field-wrapper'>
                    <input
                    className='form__field-input'
                    type='text'
                    id='username'
                    value={this.state.username}
                    placeholder='frank.underwood'
                    onChange={this._changeUsername}
                    autoCorrect='off'
                    autoCapitalize='off'
                    spellCheck='false' />
                    <label className='form__field-label' htmlFor='username'>
                        Username
                    </label>
                </div>
                <div className='form__field-wrapper'>
                    <input
                    className='form__field-input'
                    id='password'
                    type='password'
                    value={this.state.password}
                    placeholder='••••••••••'
                    onChange={this._changePassword} />
                    <label className='form__field-label' htmlFor='password'>
                    Password
                    </label>
                </div>
                <div className='form__submit-btn-wrapper'>
                    {this.props.currentlySending ? (
                        <LoadingButton />
                    ) : (
                    <button className='form__submit-btn' type='submit'>
                        {this.props.btnText}
                    </button>
                )}
                </div>
            </form>
        )
    }
}

export default LoginForm
