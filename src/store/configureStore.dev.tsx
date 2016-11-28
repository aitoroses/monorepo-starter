import * as React from 'react'

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools'

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// createDevTools takes a monitor and produces a DevTools component
export const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               defaultIsVisible={false} >
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

export default DevTools

const devToolsExtension = (window as any).devToolsExtension ? (window as any).devToolsExtension() : f => f

const isChromeExtensionEnabled = localStorage.getItem('__DEVTOOLS_EXTENSION__')


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
import {persistState} from 'redux-devtools'
import ReduxThunk from 'redux-thunk'

// Redux Saga
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas/index'
const sagaMiddleware = createSagaMiddleware()


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

    // State freeze middleware
    applyMiddleware(require('redux-freeze')),

    // Saga middleware
    applyMiddleware(sagaMiddleware),

    // Async actions
    applyMiddleware(ReduxThunk),

    // Router state
    applyMiddleware(reduxRouterMiddleware),

    // Provides support for DevTools:
    isChromeExtensionEnabled ? devToolsExtension : DevTools.instrument(),

    // Lets you write ?debug_session=<name>
    // in address bar to persist debug sessions
    persistState(
      window.location.href.match(
        /[?&]debug_session=([^&]+)\b/
      ) as any
    )

  )(createStore);

  const store = finalCreateStore(rootReducer, initialState)

  // This logic is for webpack hot-loader
  if (__DEV__ && module.hot) { // React hot development
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}

//////////////////////
// Export instance  //
//////////////////////

export const store = configureStore()
export const history = syncHistoryWithStore(hashHistory, store)

// Run saga
sagaMiddleware.run(rootSaga)
