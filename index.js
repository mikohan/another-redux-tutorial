const { createStore } = require('redux');

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
      return { ...state.state, myProperty: action.payload };
    default:
      return { state };
  }
}

const store = createStore(myReducer);

console.log(store.getState(), 'Initial state expected');

store.dispatch(myAction(67));
