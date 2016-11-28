export default function merge<T>(...objs: T[]) {
    return Object.assign.apply(Object, [{}].concat(objs))
}
