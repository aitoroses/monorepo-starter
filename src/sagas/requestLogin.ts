import { takeLatest } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'

import { loginService } from '../services/index'
import { SET_TOKEN } from '../constants/Identity'
import { LOGIN_REQUEST } from '../constants/Login'
import { SENDING_REQUEST, REQUEST_ERROR } from '../constants/Requests'

export function* login(action) {
    let {username, password} = action.data
    let response

    yield put({type: SENDING_REQUEST, sending: true})

    try {
        response = yield call(loginService.login, {username, password})
        yield put({type: SET_TOKEN, token: response.body.token})
        return true
    } catch (error) {
        console.log('error...')
        // If we get an error we send Redux the appropiate action and return
        yield put({type: REQUEST_ERROR, error: error.message})
        return false
    } finally {
        // When done, we tell Redux we're not in the middle of a request any more
        yield put({type: SENDING_REQUEST, sending: false})
    }
}


export function* watchLoginRequests() {
    yield* takeLatest(LOGIN_REQUEST, login)
}
