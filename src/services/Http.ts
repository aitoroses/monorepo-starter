import { store } from '../store/configureStore'
import { apiUrl } from 'config'
import * as Q from 'query-string'
import { Injectable } from 'angular2-di'

@Injectable()
export class Http {

    private apiKey: string
    private url: string

    constructor() {

        Object.defineProperty(this, 'apiKey', {
            get: () => store.getState().identity.token
        })

        this.url = apiUrl
    }

    getBase() {
        return this.url
    }

    getJWT() {
        return this.apiKey
    }

    request(method: string, url: string, data, query?) {

        const finalUrl = url + (query ? `?${Q.stringify(query)}` : '')

        let headers = {
            'X-User-Timezone': (new Date).getTimezoneOffset(),
            'Content-Type': "application/json"
        }

        const apiKey = this.apiKey

        if (this.apiKey) {
            headers["Authorization"] = this.apiKey
        }

        let req = {
            method,
            headers,
            body: JSON.stringify(data)
        } as any

        return fetch(finalUrl, req)
    }

    get(url, query?) {
        return this.request('GET', `${this.url}/${url}`, null, query)
    }

    post(url, data, query?) {
        return this.request('POST', `${this.url}/${url}`, data, query)
    }

}
