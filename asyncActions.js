const { createStore, applyMiddleware } = require('redux');

const thunk = require('redux-thunk').default;
const axios = require('axios');

const url = 'https://jsonplaceholder.typicode.com/users';

const LOADING = 'LOADING';
const GET_USERS = 'GET_USERS';
const ERROR = 'ERROR';

const initialState = {
  loading: false,
  users: [],
  error: '',
};

function loadingAction() {
  return {
    type: LOADING,
  };
}

function myAsyncThunk() {
  return async (dispatch) => {
    dispatch(loadingAction());
    axios
      .get(url)
      .then((res) => {
        dispatch(getUsers(res.data));
      })
      .catch((e) => dispatch(error(e)));
  };
}

function getUsers(users) {
  return {
    type: GET_USERS,
    payload: users,
  };
}

function error(error) {
  return {
    type: ERROR,
    error: error,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: '',
      };
    case ERROR:
      return {
        ...state,
        loading: false,
        error: 'Some error has occured',
      };
  }
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(store.getState()));
store.dispatch(myAsyncThunk());
