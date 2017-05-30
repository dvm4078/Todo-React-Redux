import { applyMiddleware, createStore as createReduxStore } from 'redux';
import logger from 'redux-logger';
import makeRootReducer from './reducers';

const createStore = (initialState = {}) => {

  const store = createReduxStore(
    makeRootReducer(),
    initialState,
    applyMiddleware(logger)
  );

  return store;
};

export default createStore;
