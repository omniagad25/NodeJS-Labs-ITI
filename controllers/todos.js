const Todos = require('../models/todos');

class CustomError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const find = async (query) => {
  if (!query.status) {
    const todos = await Todos.find().limit(query.limit).skip(query.skip).populate('userId')
      .exec()
      .catch((err) => {
        throw new CustomError(err.message, 422);
      });
    return todos;
  }
  const todos = await Todos.find({ status: query.status }).limit(query.limit).skip(query.skip).populate('userId')
    .exec()
    .catch((err) => {
      throw new CustomError(err.message, 422);
    });
  return todos;
};

const create = async (todo) => {
  const newTodo = await Todos.create(todo)
    .catch((err) => {
      throw new CustomError(err.message, 422);
    });
  return newTodo;
};

const deleteTodo = async (id) => {
  const todoToDelete = await Todos.deleteOne({ _id: id }).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return todoToDelete;
};
const updateTodo = async (id, body) => {
  const todoToUpdate = await Todos.updateOne({ _id: id }, body, { runValidators: true })
    .catch((err) => {
      throw new CustomError(err.message, 422);
    });
  return todoToUpdate;
};

module.exports = {
  create,
  find,
  deleteTodo,
  updateTodo,
};
