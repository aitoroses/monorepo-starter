import { takeEvery, takeLatest, delay } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'

import { watchLoginRequests } from './requestLogin'


export default function* rootSaga() {
    yield [
        fork(watchLoginRequests)
    ]
}
