/**
 * @param {number} stackLength - length of state stack to log
 * @param {function} onError - on error handler
 * @param {function} prepareState
 */
export default (stackLength, onError, prepareState = state => state) => {
    const states = new Array(stackLength);

    return store => next => action => {
        const state = prepareState(store.getState());
        state.action = action.type;
        states.unshift(Object.assign({}, state));
        states.pop();
        try {
            next(action);
        } catch (e) {
            onError(states, e, action);
            throw e;
        }
    };
};
