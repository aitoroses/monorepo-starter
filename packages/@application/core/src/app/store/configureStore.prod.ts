
import { compose, createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'

// Redux Saga
import createSagaMiddleware from 'redux-saga'
let sagaMiddleware = createSagaMiddleware()


import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux'
import { hashHistory } from 'react-router'

const reduxRouterMiddleware = routerMiddleware(hashHistory)

export function configureStore(rootReducer, rootSaga, initialState?) {

    if (!rootReducer) {
        throw Error('No rootReducer passed to store')
    }

    let finalCreateStore

    finalCreateStore = compose(

        // Saga Middleware
        applyMiddleware(sagaMiddleware),

        // Async actions
        applyMiddleware(ReduxThunk),

        // Router state
        applyMiddleware(reduxRouterMiddleware)

    )(createStore);

    const store = finalCreateStore(rootReducer, initialState)
    const history = syncHistoryWithStore(hashHistory, store)

    // Run saga
    sagaMiddleware.run(rootSaga)

    return {store, history}

}
