import {SET_TODO, EDIT_TODO, UPDATE_TODO, CHANGE_EDIT_TODO_VALUE} from './constants';

export const setTodo = (payload) => {
  return{
    type: SET_TODO,
    payload
  }
};
export const editTodo = ({index, todo}) => {
  return{
    type: EDIT_TODO,
    payload: {index, todo}
  }
};
export const updateTodo = ({index, todo}) => {
  return{
    type: UPDATE_TODO,
    payload: {index, todo}
  }
};
export const changeEditTodoValue = (value) => {
  return{
    type: CHANGE_EDIT_TODO_VALUE,
    payload: value
  }
}