/*
 * Action Types
 */

 import { SET_TOKEN, REMOVE_TOKEN } from '../constants/Identity'

/*
 * Action Creators
 */

 export function setToken(token) {
     return { type: SET_TOKEN, token }
 }

 export function removeToken() {
     return { type: REMOVE_TOKEN }
 }
