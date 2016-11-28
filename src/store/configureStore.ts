export var store
export var history
export var DevTools

export const storePromise = new Promise<any>((resolve) => {
    if ( localStorage.getItem('__DEVTOOLS_ENABLED__')) {
        require.ensure([], (require) => {
           resolve(require('./configureStore.dev'))
        })
    } else {
        require.ensure([], (require) => {
            resolve(require('./configureStore.prod'))
        })
    }
})

storePromise.then(({store: s, DevTools: d, history}) => {
    store = global.store = s;
    DevTools = d,
    history = history
})
