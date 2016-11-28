export default function propsEqual<T>(keys: string[]) {
    return (a: T) => (b: T) => {
        function pick(obj) {
            if (!keys.length) keys = Object.keys(obj)
            return keys.reduce(function(acc, k) {
                acc[k] = obj[k]
                return acc
            }, {})
        }

        return  JSON.stringify(pick(a)) === JSON.stringify(pick(b))
    }
}
