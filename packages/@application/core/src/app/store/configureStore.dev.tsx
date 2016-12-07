import * as React from 'react'

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools'

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// createDevTools takes a monitor and produces a DevTools component
const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  <DockMonitor toggleVisibilityKey='ctrl-h'
               changePositionKey='ctrl-q'
               defaultIsVisible={false} >
    <LogMonitor theme='tomorrow' />
  </DockMonitor>
);

const devToolsExtension = (window as any).devToolsExtension
    ? (window as any).devToolsExtension()
    : f => f

const isChromeExtensionEnabled = localStorage.getItem('__DEVTOOLS_EXTENSION__')

import { compose, createStore, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools'
import ReduxThunk from 'redux-thunk'

// Redux Saga
import createSagaMiddleware from 'redux-saga'
const sagaMiddleware = createSagaMiddleware()

// Redux Freeze
import * as freezeMiddleware from 'redux-freeze'

import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { hashHistory } from 'react-router'

const reduxRouterMiddleware = routerMiddleware(hashHistory)


export function configureStore(rootReducer, rootSaga, initialState?) {

  let finalCreateStore

  finalCreateStore = compose(

    // State freeze middleware
    applyMiddleware(freezeMiddleware),

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
  const history = syncHistoryWithStore(hashHistory, store)

  // Run saga
  sagaMiddleware.run(rootSaga)


  // This logic is for webpack hot-loader
  if (module.hot) { // React hot development
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }


  return { store, history, DevTools }
}
