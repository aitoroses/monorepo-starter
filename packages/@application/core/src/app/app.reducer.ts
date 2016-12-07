import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import * as hello from './hello'

export const rootReducer = combineReducers({
    [hello.constants.NAME]: hello.reducer,
    routing: routerReducer
})
