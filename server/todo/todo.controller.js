const Todo = require('./todo.model');
const todoController = {
  getTodo(req, res){
    Todo.find({}).sort({createAt: -1}).exec(function (err, todo) {
      if(err){
        return res.json({success: false, todo: todo, message: 'get todo fail'});
      }else {
        return res.json({success: true, todo: todo, message: 'get todo success'});
      }
    })
  },
  addTodo(req, res){
    var todo = new Todo({
      name: req.body.name,
      createAt: Date.now(),
    });
    todo.save((err) => {
      if(err){
        return res.json({success: false, message: 'add todo fail'});
      }else {
        return res.json({success: true,  message: 'add todo success'});
      }
    })
  },
  deleteTodo(req, res){
    var todoId = req.params.id;
    Todo.findOneAndRemove({_id:todoId}, function (err) {
      if(err){
        return res.json({success: false, message: 'delete todo fail'});
      }else {
        return res.json({success: true, message: 'delete todo success'});
      }
    })
  },
  updateTodo(req, res){
    var todoId = req.params.id;
    Todo.findOne({_id:todoId}, function (error, todo) {
      todo.name = req.body.name;
      todo.save(function (err) {
        if(err){
          return res.json({success: false, message: 'update todo fail'});
        }else {
          return res.json({success: true, message: 'update todo success'});
        }
      })
    })
  },
  updateTodoDone(req, res){
    var todoId = req.params.id;
    Todo.findOne({_id:todoId}, function (error, todo) {
      todo.done = req.body.value;
      todo.save(function (err) {
        if(err){
          return res.json({success: false, message: 'update todo done fail'});
        }else {
          return res.json({success: true, message: 'update todo done success'});
        }
      })
    })
  },
  getDone(req, res){
    Todo.find({done: true}, function (err, todo) {
      if(err){
        return res.json({success: false, todo: todo, message: 'getCheck fail'});
      }else {
        return res.json({success: true, todo: todo, message: 'getCheck success'});
      }
    })
  },
  getActive(req, res){
    Todo.find({done: false}, function (err, todo) {
      if(err){
        return res.json({success: false, todo: todo, message: 'getCheck fail'});
      }else {
        return res.json({success: true, todo: todo, message: 'getCheck success'});
      }
    })
  }
}

module.exports = todoController;