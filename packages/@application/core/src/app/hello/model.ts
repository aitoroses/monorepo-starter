export type State = {
    message: string
}

export const initialState: State = {
    message: ''
}

export const getMessage = (state: State) => ({
    message: state.message
})
