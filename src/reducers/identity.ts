import { decodeToken, JWT } from 'bss-hw-api'
import { createSelector } from 'reselect'
import { SET_TOKEN, REMOVE_TOKEN } from '../constants/Identity'

import * as Joi from 'joi'
import { maybe, Maybe, Either } from '@grayfox/tsmonad'
import { prop, compose } from 'ramda'
import { chainProp, safeEval } from '../helpers/index'

const decodeSafe = safeEval(decodeToken as (x: string) => JWT)

import { authToken } from 'config'

let token: string = localStorage.getItem(authToken) as any;
let tokenInfo = decodeSafe(token || "")
let IJWT: JWT = null as any

type IProfile = typeof IJWT.profile
type IApps = typeof IJWT.apps

// TokenInfo Schema
const TokenInfo = Joi.object().keys({
    workflowContext: Joi.string().required(),
    locale: Joi.string().required(),
    profile: Joi.object().keys({
        displayName: Joi.string().required()
    }).unknown().required(),
    sub: Joi.string().required(),
    exp: Joi.number().required(),
    iat: Joi.number(),
    apps: Joi.object().unknown()
}).unknown()

type State = { token: string | null, tokenInfo: Either<string, JWT> }

export default function auth(state: State = { token, tokenInfo }, action?) {

    switch (action.type) {

        case SET_TOKEN:

            // Either String JWT
            let tkInfo = decodeSafe(action.token)

            // Run validation
            tkInfo.caseOf({
                right: jwt => Joi.validate(jwt, TokenInfo, (err, v) => err ? console.error(err) : null),
                left: error => console.error(error)
            })

            localStorage.setItem(authToken, action.token)
            return Object.assign({}, state, { token: action.token, tokenInfo: tkInfo })

        case REMOVE_TOKEN:
            localStorage.removeItem(authToken)
            return Object.assign({}, state, { token: null, tokenInfo: null })

        default:
            return state
    }
}

// getJWT :: State -> Maybe JWT
export const getJWT = createSelector(
    (s: State) => s.tokenInfo.caseOf({
        left: x => null,
        right: x => x
    }),
    (token): Maybe<JWT | null> => maybe(token)
)

// Get a Key from a JWT with type safety
// getKey <T> :: String -> State -> T
const getKey = <T>(k: string): (s: State) => T => (compose(chainProp(k), getJWT))

// getLoggedUser :: State -> Maybe String
export const getLoggedUser = getKey<Maybe<string>>('sub')

// getLoggedUserDisplayName :: State -> Maybe String
export const getLoggedUserDisplayName: (s) => Maybe<string>  = compose(chainProp('displayName'), getKey<any>('profile'))

// getUserLanguage :: State -> Maybe String
export const getUserLanguage = getKey<Maybe<string>>('locale')

// getWorkflowContext :: State -> Maybe String
export const getWorkflowContext = getKey<Maybe<string>>('workflowContext')

// getProfile :: State -> Maybe Profile
export const getProfile = getKey<Maybe<IProfile>>('profile')

// getApps :: State -> Maybe Apps
export const getApps = getKey<Maybe<IApps>>('apps')
