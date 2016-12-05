import { effects } from './hello'

export function* rootSaga() {
    yield [
        effects.logEffect
    ]
}
