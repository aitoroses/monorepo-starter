import { takeEvery, takeLatest, delay } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'

import { compose, create, query, auth, httpEffect } from '../shared/http'
import { mockEffect } from '../shared/mock/effect'

import { sayHello } from './actions'

function* logEffectSaga(): any {
    // Loop
    while (true === true) { // This equality will let the compiler reach outside the loop

        // Wait
        yield delay(1000)

        const now = `Now: ${(new Date).getTime()}`

        // Dispatch sayHello
        yield put(sayHello(now))

        // Log the result
        console.log(now)
    }

    // Something that will never happen
    const kittens = yield compose(
        mockEffect({kittens: ['My Kitty']}), // In case we are in DEV we can mock this effect
        httpEffect,
        auth, // Just for testing
        query({q: 'kittens', sort: 'new'}),
        create('GET'))
        ('https://www.reddit.com/r/pics/search.json')
}

export const logForkEffect = fork(logEffectSaga)
