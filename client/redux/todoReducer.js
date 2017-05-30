import {SET_TODO, EDIT_TODO, UPDATE_TODO, CHANGE_EDIT_TODO_VALUE} from './constants';

const initialState = {
  todo: [],
  value: '',
  editTodo: {
    index: '',
    todo: {

    }
  }
};
export default function (state = initialState, action) {
  switch (action.type){
    case SET_TODO:
      return {...state, todo: action.payload, editTodo: {index: '', todo: {}}};
    case EDIT_TODO:
      return {...state, editTodo: {...state.editTodo, index: action.payload.index, todo: action.payload.todo}};
    case UPDATE_TODO:
      const todo = JSON.parse(JSON.stringify(state.todo));
      todo.slice(action.payload.index, 1, action.payload.todo);
      return {...state, todo}
    case CHANGE_EDIT_TODO_VALUE:
      return {...state, editTodo: {...state.editTodo, todo: {...state.editTodo.todo, name: action.payload}}};
    default:
      return state;
  }
}