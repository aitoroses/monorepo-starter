//////////////////
// Dependencies //
//////////////////
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import { Provider } from 'react-redux'

///////////////////////
// Components import //
///////////////////////

// -- Import components --
import App from './containers/App'

///////////
// Store //
///////////

import {storePromise} from './store/configureStore'

/*****************************************************************
 * Root component                                                *
 * Is the top level component, it wraps the application entirely *
 * for rerendering in case of changes in the Redux Store         *
 *                                                               *
 * Here we are defining the application routes.                  *
 *                                                               *
 * The MainHandler is the component that acts as layout for the  *
 * others, passed as children to it.                             *
 *****************************************************************/

class Root extends React.Component<any, any> {

    state = {
        store: null as any,
        DevTools: null as any,
        history: null as any
    }

    async componentDidMount() {
        this.setState(await storePromise)
    }

    render() {
        const {store, DevTools} = this.state

        if (!store) return <noscript />

        return (
            <Provider store={store}>
                <div>
                    <Router history={ this.state.history }>
                        <Route path="/" component={App}>
                            <Route path="dashboard" component={Dashboard} />
                        </Route>
                    </Router>
                    { DevTools ? <DevTools store={store} /> : null }
                </div>
            </Provider>
        )
    }
}

///////////////////////////
// Application Bootstrap //
///////////////////////////

/***************************************************************************
 * The application render target is the root node in the index.html folder *
 *                                                                         *
 * In case that we are in development mode with DEBUG=true the redux state *
 * monitor will appear also.                                               *
 ***************************************************************************/
function main() {

    // TODO: React v15 will not need this
    const injectTapEventPlugin = require('react-tap-event-plugin')
    injectTapEventPlugin()

    let target: HTMLElement | null = document.getElementById(global.rootElement || 'root')

    if (target) {
        ReactDOM.render(
            <Root />,
            target
        )
    } else {
        console.warn("Care there's no #root element")
    }
}

if (document.readyState === "complete" || document.readyState === "loaded") {
     main()
} else {
    document.addEventListener('DOMContentLoaded', main)
}
