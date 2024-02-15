const jwt = require('jsonwebtoken');
const Users = require('../models/users');
const Todos = require('../models/todos');
const CustomError = require('../lib/custom-error');

const secretKey = process.env.key || 'test';

const create = (input) => {
  const user = Users.create(input).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return user;
};

const userLogin = async (username, password) => {
  const user = await Users.findOne({ username }).exec();
  const valid = await user.verifyPassword(password);
  if (!user || !valid) {
    return new CustomError('Unauthenticated', 401);
  }
  user.token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '7d' });
  return user;
};

const findOne = (id) => {
  Users.findOne(id).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return findOne;
};
const getAllUsers = () => Users.find().select({ _id: 0, firstName: 1 });
const deleteUser = (id) => {
  Users.deleteOne({ _id: id }).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return deleteUser;
};
const updateUser = (id, body) => {
  Users.updateOne({ _id: id }, body, { runValidators: true })
    .catch((err) => {
      throw new CustomError(err.message, 422);
    });
  return updateUser;
};

const getUser = (id) => {
  Users.findOne({ _id: id }).catch((err) => {
    throw new CustomError(err.message, 422);
  });
  return getUser;
};

const getUserTodos = async (userID) => {
  const UserTodos = await Todos.find({ userId: userID })
    .catch((err) => {
      throw new CustomError(err.message, 422);
    });
  return UserTodos;
};

module.exports = {
  create,
  findOne,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserTodos,
  userLogin,
};
