interface GeneratorState {
    in: any
    out: IteratorResult<any>
}

export type StatefulGeneratorConstructor = () => StatefulGenerator

class StatefulGenerator {
    constructor(public state: GeneratorState[], public generator: IterableIterator<any>) {}

    getState() {
        return this.state
    }

    getLastOutput() {
        let state = this.getState()
        return (state[state.length-1] as any).out.value
    }

    next(...args) {
        return this.generator.next.apply(this.generator, args)
    }
}

export function createStateful<T>(gen: () => IterableIterator<any>): () => StatefulGenerator {
    return function() {
        let g = gen()
        let state: GeneratorState[] = []

        let originalNext = g.next

        let result = new StatefulGenerator(state, g)

        // MonkeyPatch next function
        g.next = function (arg) {
            let iter = originalNext.apply(g, [arg])
            result.state = [...result.state, {in: arg, out: iter}]
            return iter
        }

        return result
    }
}

export function cloneWithState(gen: StatefulGeneratorConstructor, state: GeneratorState[]) {
    let cloned = gen()
    for (let v of state) {
        cloned.next(v.in)
    }
    return cloned
}
