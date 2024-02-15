const router = require('express').Router();
const jwt = require('jsonwebtoken');
const { TodosController, UsersController } = require('../controllers');
const CustomError = require('../lib/custom-error');
const asyncWrapper = require('../lib/async-wrapper');

const secretKey = process.env.key || 'test';

router.use((req, res, next) => {
  try {
    const token = req.get('authorization');
    const verified = jwt.verify(token, secretKey);
    if (verified) {
      // eslint-disable-next-line no-underscore-dangle
      req.userId = verified.id;
      return next();
    }
    throw new CustomError('UNAUTHORIZED', 401);
  } catch (error) {
    throw new CustomError('Invalid token', 401);
  }
});

router.get('/', async (req, res) => {
  const todos = await TodosController.find(req.query, req.userId);
  res.json(todos);
});

router.post('/', async (req, res, next) => {
  req.body.userId = req.userId;
  const [err, todo] = await asyncWrapper(TodosController.create(req.body));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

router.patch('/:id', async (req, res, next) => {
  req.body.userId = req.userId;
  const [err, todo] = await asyncWrapper(UsersController.updateTodo(req.params.id, req.body));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

router.delete('/:id', async (req, res, next) => {
  const [err, todo] = await asyncWrapper(UsersController.deleteTodo(req.params.id));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

module.exports = router;
