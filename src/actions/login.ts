/*
 * Action Types
 */

 import { LOGIN_REQUEST, LOGIN_ERROR } from '../constants/Login'

/*
 * Action Creators
 */

export function loginRequest(auth: {username: string, password: string}) {
    return { type: LOGIN_REQUEST, auth }
}

