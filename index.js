const { createStore } = require('redux');

const MY_ACTION = 'MY_ACTION';

const myAction = (payload) => {
  return {
    type: MY_ACTION,
    payload: payload,
  };
};

const initialState = {
  myProperty: {
    one: 34,
  },
};

function myReducer(state = initialState, action) {
  switch (action.type) {
    case MY_ACTION:
      return {
        ...state,
        myProperty: {
          one: action.payload,
        },
      };
    default:
      return { state };
  }
}

const store = createStore(myReducer);

store.dispatch(myAction(67));

console.log(store.getState());
