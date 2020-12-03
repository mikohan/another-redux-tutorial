export function createStoreMy(rootReducer, initialState = {}) {
  let state = rootReducer(initialState, '__INIT__');
  let subscribers = [];
  return {
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach((call) => call());
    },
    subscribe(callback) {
      subscribers.push(callback);
      return () => console.log('unsubscribe');
    },
    getState() {
      return state;
    },
  };
}
