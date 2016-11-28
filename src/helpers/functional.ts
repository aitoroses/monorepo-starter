import { maybe, Maybe, Either, either } from '@grayfox/tsmonad'
import { prop, curry } from 'ramda'

// safeProp :: String -> { String: A } -> Maybe A
export const safeProp = curry((k: string, object: any) => {
    try {
        return maybe(object[k])
    } catch(e) {
        return Maybe.nothing()
    }
})

// chain :: (B -> Monad A) -> Monad B -> Monad A
export const chain = curry((fn, m: any) => m.chain(fn))

// chainProp :: String -> Maybe B -> Maybe A
export const chainProp = k => chain(safeProp(k))

// safeEval :: (P[]) => A) -> String -> Either String A
export const safeEval = <A, P>(fn: (...args: P[]) => A) => {
    return (...args: P[]): Either<string, A> => {
        try {
            const res = fn.apply(null, args)
            return res ? Either.right(res) : Either.left(`safeEval returned undefined: ${fn.toString()}`)
        } catch(e) {
            return Either.left(e)
        }
    }
}
