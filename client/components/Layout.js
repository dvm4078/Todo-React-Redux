import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import $ from "jquery";
import {setTodo, editTodo, filterSearch, updateTodo, changeEditTodoValue, filterDone, filterActive, filterAll} from "../redux/actions";
class Layout extends React.Component{
  constructor(props){
    super(props);
    this.getTodo = this.getTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChangeEditTodo = this.handleChangeEditTodo.bind(this);
    this.editItem = this.editItem.bind(this);
    this.handleDoneTodo = this.handleDoneTodo.bind(this);
    this.filterDone = this.filterDone.bind(this);
    this.filterActive = this.filterActive.bind(this);
    this.filterAll = this.filterAll.bind(this);
    this.filterSearch = this.filterSearch.bind(this);
  }
  componentWillMount(){
    this.getTodo();
  }
  getTodo(){
    $.get('http://localhost:8000/todo', (response)=> {
      this.props.setTodo(response.todo)
    })
  }
  addTodo(event){
    event.preventDefault();
    $.ajax({
      type: "POST",
      contentType: "application/json;charset=utf-8",
      url: "http://localhost:8000/add-todo",
      data: JSON.stringify({
        name: document.getElementById('add-todo').value,
      }),
      success: (response) => {
        if(response.success){
          document.getElementById('add-todo').value = '';
          this.getTodo();
        }else {
          alert('Add Fail');
        }
      }
    })
  }
  deleteTodo(id){
    $.ajax({
      type: "DELETE",
      url: "http://localhost:8000/delete-todo/" + id,
      success: (response) => {
        if(response.success){
          this.getTodo();
        }else {
          alert('Delete Fail');
        }
      }
    })
  }
  editItem(index, todo){
    this.props.editTodo({index, todo});
  }
  handleUpdate(event){
    event.preventDefault();
    console.log(this.props.todoApp.editTodo.todo);
    $.ajax({
      type: "PUT",
      contentType: "application/json;charset=utf-8",
      url: "http://localhost:8000/update-todo/" + this.props.todoApp.editTodo.todo._id,
      data: JSON.stringify({
        name: this.props.todoApp.editTodo.todo.name,
      }),
      success: (response) => {
        if(response.success){
          this.getTodo();
        }
      }
    })
  }
  handleChangeEditTodo(event){
    this.props.changeEditTodoValue(event.target.value);
  }
  handleDoneTodo(event, todo){
    $.ajax({
      type: "PUT",
      contentType: "application/json;charset=utf-8",
      url: "http://localhost:8000/update-todo-done/" + todo._id,
      data: JSON.stringify({
        value: !todo.done,
      }),
      success: (response)=>{
        if(response.success){
          this.getTodo();
        }
      }
    })
  }

  filterDone() {
    this.props.filterDone();
  }
  filterActive(){
    this.props.filterActive();
  }
  filterAll(){
    this.props.filterAll();
  }
  filterSearch(event){
    event.preventDefault();
    const value = document.getElementById('search-todo').value;
    this.props.filterSearch(value);
  }
  render(){
    return(
      <div className="container">
        <div className="row">
          <h1 className="text-center">Todo</h1>
          <form onSubmit={this.addTodo} style={{marginTop: '30px'}}>
            <input placeholder="Add Todo" type="text" id="add-todo" className="form-control"/>
          </form >
          <div style={{marginTop: '10px'}}>
            <input onChange={this.filterSearch} id="search-todo" placeholder="Search" type="text" className="form-control"/>
          </div>
          <div style={{marginTop: '10px'}}>
            <button onClick={this.filterAll} type="button" className="btn btn-success">All</button>
            <button onClick={this.filterActive} type="button" className="btn btn-success">Active</button>
            <button onClick={this.filterDone} type="button" className="btn btn-success">Completed</button>
          </div>
          <div style={{marginTop: '20px'}}>
            <ul className="list-group">
              {this.props.todoApp.todo.map((todoItem, index) => {
                return <li key={index} style={{marginTop: '20px'}} className="list-group-item">
                  {(this.props.todoApp.editTodo.index !== index) ? <div>
                    <input type="checkbox" className="pull-left" onChange={(event)=> this.handleDoneTodo(event, todoItem)} checked={todoItem.done}/>
                    <span onDoubleClick={()=>{this.editItem(index, todoItem)}} style={{marginLeft: '10px'}}>{todoItem.name}</span>
                    <a onClick={() => {this.deleteTodo(todoItem._id)}} className="pull-right">Remove</a>
                  </div>:
                    <form onSubmit={this.handleUpdate}>
                      <input type="text" onChange={this.handleChangeEditTodo} value={this.props.todoApp.editTodo.todo.name}/>
                    </form>}

                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return{todoApp: state.todo}
}
function mapDispatchProps(dispatch) {
  return bindActionCreators ({setTodo, editTodo, filterSearch, updateTodo, changeEditTodoValue, filterDone, filterActive, filterAll}, dispatch);
}
export default connect (mapStateToProps, mapDispatchProps)(Layout);