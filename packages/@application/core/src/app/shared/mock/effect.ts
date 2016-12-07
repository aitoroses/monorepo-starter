export const mockEffect = replaceEffect => effect => {
    if (ENV === 'production'){
        return effect
    } else {
        return replaceEffect
    }
}
