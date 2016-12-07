import * as React from 'react'
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'

import { createStore } from './store'
import { rootReducer } from './app.reducer'
import { rootSaga } from './app.effects'

import routes from './app.routes'

export class Root extends React.Component<any, any> {

    state = {
        store: null,
        DevTools: null,
        history: null
    }

    async componentDidMount() {
        const storeModule = await createStore(rootReducer, rootSaga)
        this.setState(storeModule)
    }

    render() {
        const {store, DevTools} = this.state

        if (!store) return <noscript />

        return (
            <Provider store={store}>
                <div>
                    <Router history={ this.state.history }>
                        {routes}
                    </Router>
                    { DevTools ? <DevTools store={store} /> : null }
                </div>
            </Provider>
        )
    }
}
