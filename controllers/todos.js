const Todos = require('../models/todos');
const CustomError = require('../lib/custom-error');

const find = async (query, id) => {
  const todos = await Todos.find({ status: query.status, userId: id }).limit(query.limit || 10).skip(query.skip || 0).populate('userId')
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
  const todoToUpdate = await Todos.findOneAndUpdate(
    { _id: id, userId: body.userId },
    body,
    { new: true },
  )
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
