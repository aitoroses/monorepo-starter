import { SET_AUTH } from '../constants/Auth'

const initialState = {}

export default function auth(state = initialState, action) {

    switch (action.type) {

    case SET_AUTH:
        return action.auth

    default:
        return state
    }
}
