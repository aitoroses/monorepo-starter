export default function ensure(conditionFn, fn, time = 100) {
    if (conditionFn()) {
        fn()
    } else {
        setTimeout(() => {
            ensure(conditionFn, fn)
        }, time)
    }
}
