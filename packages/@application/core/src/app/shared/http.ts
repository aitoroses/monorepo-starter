import { call } from 'redux-saga/effects'
export { compose } from 'ramda'
import * as Q from 'query-string'

export type Request = {
    method: string
    url: string
    body: string | undefined,
    headers: {[x: string]: any}
}

export const create = (method: string) => (url: string): Request => ({
    method,
    url,
    body: undefined,
    headers: {
        'X-User-Timezone': (new Date).getTimezoneOffset(),
        'Content-Type': 'application/json'
    }
})

export const query = queryObj => (req: Request): Request => {
    req.url += queryObj ? `?${Q.stringify(queryObj)}` : ''
    return req
}

export const body = (bodyObj) => (req: Request): Request => {
    req.body = bodyObj ? JSON.stringify(bodyObj) : null
    return req
}

export const auth = (req: Request): Request => {
    try {
        let storageToken = localStorage.getItem('auth.token')
        if (!storageToken) throw Error('Not token present')
        let token = atob(storageToken)
        req.headers['Authorization'] = `Bearer ${token}`
    } catch (e) {
        // console.error(e)
    } finally {
        return req
    }
}

export const httpEffect = (req: Request) => call(fetch, req.url, req)
