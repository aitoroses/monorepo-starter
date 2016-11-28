/**************************************************************************
 * Root reducer                                                           *
 *                                                                        *
 * We will pass to our store just one reducer to handle all the state     *
 * by combining all the reducers                                          *
 *                                                                        *
 **************************************************************************/

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Import reducers
import task from './task'
import identity from './identity'

const rootReducer = combineReducers({
    identity,
    task,
	routing: routerReducer
})

// Default export
export default rootReducer

///////////////////////////
//   Binding selectors   //
///////////////////////////

const bind = (selector: string) => <T>(selectorFunction: (...args) => T) =>
    state => selectorFunction(state[selector])

// Binders
let taskBound = bind('task')
let identityBound = bind('identity')

// Import and export bound selectors
import * as identitySelectors from '../reducers/identity'
import * as taskSelectors from '../reducers/task'

export const getTask = taskBound(taskSelectors.getTask)
export const getLoggedUser = identityBound(identitySelectors.getLoggedUser)
export const getLoggedUserDisplayName = identityBound(identitySelectors.getLoggedUserDisplayName)
