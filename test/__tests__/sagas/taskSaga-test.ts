import { expect } from 'chai'
import { put, call } from 'redux-saga/effects'
import { taskUpdate, fetchTask } from '../../../src/sagas/taskSaga'
import { updateOutcome, fetchTask as fetchTaskAction, setTask } from '../../../src/actions/task'
import { taskService } from '../../../src/services'
import { Maybe } from '@grayfox/tsmonad'
import { TASK_UPDATE_SUCCESS, TASK_FETCH_FAILED } from '../../../src/constants/Task'
import { WORKSPACE_CLOSE_HW } from '../../../src/constants/Workspace'


describe('Sagas: Task', () => {

    describe('taskUpdate success:', () => {

        let outcome, task, saga, action

        before(() => {
            outcome = 'APPROVE'
            action = updateOutcome(outcome)
            task = Maybe.just("MY_TASK_OBJECT") as any
            saga = taskUpdate(action)
        })

        it('should set task outcome', () => {
            const value = saga.next().value
            const expected = put(action)
            expect(value).deep.equal(expected)
        })

        it('should call updateTask service', () => {

            // skip SELECT and return task
            const select = saga.next().value
            const value = saga.next({ task }).value
            const expected = call(taskService.updateTask, "MY_TASK_OBJECT" as any)
            expect(value).deep.equal(expected)
        })

        it('should put TASK_UPDATE_SUCCESS', () => {
            const value = saga.next().value
            expect(value.PUT.action.type).deep.equal(TASK_UPDATE_SUCCESS)
        })

        it('should put WORKSPACE_CLOSE_HW', () => {
            const value = saga.next().value
            expect(value.PUT.action.type).deep.equal(WORKSPACE_CLOSE_HW)
        })

    })

    describe('taskUpdate error:', () => {

        let outcome, task, saga, action

        before(() => {
            outcome = 'APPROVE'
            action = updateOutcome(outcome)
            task = Maybe.nothing()
            saga = taskUpdate(action)
        })

        it('should set task outcome', () => {
            const value = saga.next().value
            const expected = put(action)
            expect(value).deep.equal(expected)
        })

        it('should put TASK_FETCH_FAILED', () => {

            // skip SELECT and return task
            const select = saga.next().value
            const value = saga.next({ task }).value
            expect(value.PUT.action.type).deep.equal(TASK_FETCH_FAILED)
        })
    })

    describe('taskFetch success:', () => {

        let saga = fetchTask(fetchTaskAction("my-task-id"))

        it('should call queryTaskDetails', () => {
            const value = saga.next().value
            const expected = call(taskService.queryTaskDetails, "my-task-id")
            expect(value).deep.equal(expected)
        })

        it('should put task', () => {
            const value = saga.next("MY-TASK").value
            const expected = put(setTask('MY-TASK'))
            expect(value).deep.equal(expected)
        })
    })

    describe('taskFetch error:', () => {

        let saga = fetchTask(fetchTaskAction("my-task-id"))

        it('should call queryTaskDetails', () => {
            const value = saga.next().value
            const expected = call(taskService.queryTaskDetails, "my-task-id")
            expect(value).deep.equal(expected)
        })

        it('should put task fetch error', () => {
            const value = (saga as any).throw().value
            const expected = put(setTask('MY-TASK'))
            expect(value.PUT.action.type).deep.equal(TASK_FETCH_FAILED)
        })
    })
})
