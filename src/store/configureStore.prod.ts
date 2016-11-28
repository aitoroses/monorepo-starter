/***************************************************************************************
 * The Store is the object that brings them together.                                  *
 * The store has the following responsibilities:                                       *
 *                                                                                     *
 *   - Holds application state;                                                        *
 *   - Allows access to state via getState();                                          *
 *   - Allows state to be updated via dispatch(action);                                *
 *   - Registers listeners via subscribe(listener).                                    *
 *                                                                                     *
 * Itâ€™s important to note that youâ€™ll only have a single store in a Redux application. *
 * When you want to split your data handling logic,                                    *
 * youâ€™ll use reducer composition instead of many stores.                              *
 *                                                                                     *
 * http://rackt.github.io/redux/docs/basics/Store.html                                 *
 ***************************************************************************************/


import { compose, createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

// Redux Saga
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index'
let sagaMiddleware = createSagaMiddleware()


/******************************************************************
 * We will use react-router-redux to have the router state in the store *
 ******************************************************************/

import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { hashHistory } from 'react-router'

const reduxRouterMiddleware = routerMiddleware(hashHistory)

/*
 * Root Reducer for the store
 */
import rootReducer from '../reducers/index'

/**
 * This function creates the store instance that the application will be using
 * Its configured with the following
 *
 *   - Redux DevTools (devtools and monitor)
 *   - Redux Router
 * @param  {any}         initialState - Initial state of the store
 * @return {Redux.Store}              Store instance
 */
function configureStore(initialState?: any): Redux.Store {

  let finalCreateStore: (reducer: Redux.Reducer, state: any) => Redux.Store

  finalCreateStore = compose(

    // Saga Middleware
    applyMiddleware(sagaMiddleware),

    // Async actions
    applyMiddleware(ReduxThunk),

    // Router state
    applyMiddleware(reduxRouterMiddleware)

  )(createStore);

  const store = finalCreateStore(rootReducer, initialState)

  return store
}

//////////////////////
// Export instance  //
//////////////////////

export const store = configureStore()
export const history = syncHistoryWithStore(hashHistory, store)

// Run saga
sagaMiddleware.run(rootSaga)
