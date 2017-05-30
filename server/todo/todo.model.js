const mongoose = require('mongoose');
const Todo = mongoose.model('Todo', new mongoose.Schema({
  name: String,
  done: {
    type: Boolean,
    default: false
  },
  createAt: Date,
}));
module.exports = Todo;