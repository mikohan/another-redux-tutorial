const { createStore } = require('redux');

function createStoreMy(rootReducer, initialState) {
  let state = {};
  let subscribers = [];
  return {
    dispatch(action) {
      state = rootReducer(state, action);
      subscribers.forEach((call) => call());
    },
    subscribe(callback) {
      subscribers.push(callback);
    },
    getState() {
      return state;
    },
  };
}

const MY_ACTION = 'MY_ACTION';

const myAction = (payload) => {
  return {
    type: MY_ACTION,
    payload: payload,
  };
};

const initialState = {
  myProperty: 34,
};

function myReducer(state = initialState, action) {
  switch (action.type) {
    case MY_ACTION:
      // console.log(state.state);
      return { ...state, myProperty: action.payload };
    default:
      return state;
  }
}

const store = createStore(myReducer);

console.log(store.getState(), 'Initial state expected');

const unsubscribe = store.subscribe(() => {
  console.log('New state expected:', store.getState());
});

store.dispatch(myAction(67));
store.dispatch(myAction(130));
store.dispatch(myAction(499));

unsubscribe();
