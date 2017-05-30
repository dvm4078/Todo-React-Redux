import { combineReducers } from 'redux'
import todoReducer from './redux/todoReducer'

export const makeRootReducer = () => {
  return combineReducers({
    todo: todoReducer
  })
};

export default makeRootReducer;