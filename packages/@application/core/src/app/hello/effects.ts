import { takeEvery, takeLatest, delay } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'

import { sayHello } from './actions'

function* logEffectSaga(): any {
    // Loop
    while (true) {

        // Wait
        yield delay(1000)

        const now = `Now: ${(new Date).getTime()}`

        // Dispatch sayHello
        yield put(sayHello(now))

        // Log the result
        console.log(now)
    }
}

export const logEffect = fork(logEffectSaga)
