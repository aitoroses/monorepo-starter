import { SAY_HELLO } from './constants'

export const sayHello = (message: string) => ({
    type: SAY_HELLO,
    message
})
