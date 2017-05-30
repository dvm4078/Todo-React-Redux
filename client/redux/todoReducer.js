import {SET_TODO, FILTER_SEARCH, EDIT_TODO, UPDATE_TODO, CHANGE_EDIT_TODO_VALUE, FILTER_DONE, FILTER_ALL, FILTER_ACTIVE} from './constants';

const initialState = {
  todo: [],
  backupTodo: [],
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
      return {...state, todo: action.payload, backupTodo: action.payload, editTodo: {index: '', todo: {}}};
    case EDIT_TODO:
      return {...state, editTodo: {...state.editTodo, index: action.payload.index, todo: action.payload.todo}};
    case UPDATE_TODO:
      const todo = JSON.parse(JSON.stringify(state.todo));
      todo.slice(action.payload.index, 1, action.payload.todo);
      return {...state, todo}
    case CHANGE_EDIT_TODO_VALUE:
      return {...state, editTodo: {...state.editTodo, todo: {...state.editTodo.todo, name: action.payload}}};
    case FILTER_DONE:
      const todoList = state.backupTodo.filter(todo => {
        return todo.done;
      });
      return {...state, todo: todoList};
    case FILTER_ACTIVE:
      const todoListActive = state.backupTodo.filter(todo => {
        return !todo.done;
      });
      return {...state, todo: todoListActive};
    case FILTER_ALL:
      return {...state, todo: state.backupTodo};
    case FILTER_SEARCH:
      if (action.value) {
        const todoListSearch = state.backupTodo.filter(todo => {
          return todo.name.indexOf(action.value) > -1;
        });
        return {...state, todo: todoListSearch};
      }
      return {...state, todo: state.backupTodo};
    default:
      return state;
  }
}