import { HumanWorkflow as HW, TokenAction, TOKEN_UPDATED } from 'bss-hw-api'
import { Http } from './Http'
import { Injectable } from 'angular2-di'

// For dispatching tokens
import { store } from '../store/configureStore'
import { setToken } from '../actions/identity'

@Injectable()
export class HumanWorkflow extends HW {
    constructor(private http: Http) {
        super(http.getBase())

        // Connect to our store
        this.subscribe((a: TokenAction) => {
            if (a.type == TOKEN_UPDATED) {
                if (a.token) {
                    store.dispatch(setToken(a.token))
                }
            }
        })
    }
}
