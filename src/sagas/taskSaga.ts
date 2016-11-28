import { takeEvery, takeLatest, delay } from 'redux-saga'
import { put, fork, call, select } from 'redux-saga/effects'

import { SET_TASK, SET_TASK_OUTCOME, TASK_FETCH_REQUEST, TASK_FETCH_FAILED, TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS } from '../constants/Task'
import { WORKSPACE_CLOSE_HW } from '../constants/Workspace'
import { taskService } from '../services'
import { setTask, updateOutcome } from '../actions/task'
import { currentTaskSelector } from '../selectors'
import { Maybe } from 'tsmonad'
import { ITask } from '../interfaces/index'

export function* taskSaga() {
    yield [
        fork(watchTaskRequests),
        fork(watchTaskUpdates)
    ]
}

export function* watchTaskRequests() {
    yield* takeLatest(TASK_FETCH_REQUEST, fetchTask)
}

export function* watchTaskUpdates() {
    yield* takeLatest(TASK_UPDATE_REQUEST, taskUpdate)
}

export function* fetchTask(action) {
    try {
        const taskId = action.taskId
        const task = yield call(taskService.queryTaskDetails, action.taskId)

        yield put(setTask(task))

    } catch(e) {
        yield put({ type: TASK_FETCH_FAILED })
    }
}

export function* taskUpdate(action) {

    const errorCase = function* () {
        yield put({ type: TASK_FETCH_FAILED })
    }

    const successCase = (task: ITask) => function* () {
        // Update task effect
        yield call(taskService.updateTask, task)

        yield put({ type:  TASK_UPDATE_SUCCESS })
        yield put({ type:  WORKSPACE_CLOSE_HW })
    }

    try {
        // Update the outcome locally
        yield put(updateOutcome(action.outcome))

        // Get the task from the state
        const { task } = (yield select(currentTaskSelector)) as { task: Maybe<ITask> }

        yield* task.caseOf({
            nothing: errorCase,
            just: task => successCase(task)()
        })

    } catch(e) {
        console.error(e)
        yield* errorCase()
    }
}
