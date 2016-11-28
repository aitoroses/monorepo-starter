import { takeEvery, takeLatest, delay } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'

import { WORKSPACE_GO_BACK, WORKSPACE_CLOSE_HW } from '../constants/Workspace'

const lsbus = require('lsbus')

// This factory generates a watcher saga for any workspace event
function workspaceWatcherSagaFactory(event) {
    return function* () {
        yield* takeLatest(event, function* () {

            // Wait one second before redirecting
            yield call(delay, 1000)

            // Call workspace go back using localStorage bridge
            yield call(lsbus.send, 'workspace', {
                type: event
            })
        })
    }
}

// Watch for any event
export function* watchWorkspaceEvents() {
    yield [ WORKSPACE_GO_BACK, WORKSPACE_CLOSE_HW ]
        .map(workspaceWatcherSagaFactory)
        .map(fork)
}
