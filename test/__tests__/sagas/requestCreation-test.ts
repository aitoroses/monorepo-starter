import { expect } from 'chai'
import { put, call, take } from 'redux-saga/effects'
import { createRequest as createRequestAction } from '../../../src/actions/create'
import { createRequest } from '../../../src/sagas/requestCreation'
import { WORKSPACE_GO_BACK } from '../../../src/constants/Workspace';
import { createService } from '../../../src/services'


describe('Sagas: Request Creation', () => {

    const saga = createRequest(createRequestAction())

    it('should create a request', () => {
        expect(saga.next().value).deep.equal(call(createService.instantiate))
        expect(saga.next().value).deep.equal(put({type: WORKSPACE_GO_BACK}))
    })
})
