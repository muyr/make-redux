export function createStore(stateChanger) {
    const listeners = []
    const subscribe = (listener) => listeners.push(listener)
    let state = null
    const getState = () => state
    const dispatch = (action) => {
        state = stateChanger(state, action)
        listeners.forEach((listener) => listener())
    }
    dispatch({})
    return {getState, dispatch, subscribe}
}

export default {createStore}
