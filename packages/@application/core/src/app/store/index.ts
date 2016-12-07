export var store
export var history
export var DevTools

export function createStore(rootReducer, rootSaga, initialState?) {

    function instantiateStore({configureStore}) {

        const {store: s, DevTools: d, history: h} = configureStore(
            rootReducer,
            rootSaga,
            initialState
        )

        store = s;
        DevTools = d
        history = h

        return { store, history, DevTools }
    }

    if ( localStorage.getItem('__DEVTOOLS_ENABLED__')) {
        return System.import('./configureStore.dev')
            .then(instantiateStore)

    } else {
        return System.import('./configureStore.prod')
            .then(instantiateStore)
    }
}
