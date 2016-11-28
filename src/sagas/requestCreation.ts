import { takeEvery, takeLatest, delay } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'

import { createService } from '../services/index'
import { CREATE_REQUEST } from '../constants/Create'
import { WORKSPACE_GO_BACK } from '../constants/Workspace'

export function* createRequest(action) {
    try {
        // Call instantiation
        yield call(createService.instantiate)

        // Call workspace go back
        yield put({
            type: WORKSPACE_GO_BACK
        })

    } catch(e) {
        console.error(e)
    }
}

export function* watchCreateRequests() {
    yield* takeLatest(CREATE_REQUEST, createRequest)
}
