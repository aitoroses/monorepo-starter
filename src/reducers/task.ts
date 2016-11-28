import { SET_TASK, SET_TASK_OUTCOME } from '../constants/Task'
import { Maybe, maybe } from '@grayfox/tsmonad'
import { ITask } from 'bss-hw-api'
import { createSelector } from 'reselect'

const initialState: ITask | null = null

export default function task(task = initialState, action) {

    switch (action.type) {

        case SET_TASK:
            return action.task

        case SET_TASK_OUTCOME:
            if (task) {
                let systemAttributes = Object.assign({}, task.systemAttributes, {outcome: action.outcome})
                return Object.assign({}, task, {systemAttributes})
            }

        default:
            return task
    }
}

// Memoize selector (because maybe(task) will be always a different ref)
export const getTask = createSelector(
    task => task as ITask,
    task => maybe(task)
)
