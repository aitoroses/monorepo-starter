import { SAY_HELLO } from './constants'
import { initialState, State } from './model'

export default function helloReducer(state = initialState, action): State {
    switch (action.type) {

        case SAY_HELLO:
            return { message: action.message }

        default:
            return state
    }
}
