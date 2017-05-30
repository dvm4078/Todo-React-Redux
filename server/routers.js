const express = require('express');
const todoController = require('./todo/todo.controller');

const router = express.Router();

router.get('/todo', todoController.getTodo);
router.post('/add-todo', todoController.addTodo);
router.delete('/delete-todo/:id', todoController.deleteTodo);
router.put('/update-todo/:id', todoController.updateTodo);
router.put('/update-todo-done/:id', todoController.updateTodoDone);
router.get('/get-done', todoController.getDone);
router.get('/get-active', todoController.getActive);

module.exports = router;