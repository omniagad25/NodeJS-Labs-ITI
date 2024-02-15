const router = require('express').Router();
const { TodosController, UsersController } = require('../controllers');
const asyncWrapper = require('../lib/async-wrapper');

router.get('/', async (req, res) => {
  const todos = await TodosController.find(req.query);
  res.json(todos);
});

router.post('/', async (req, res, next) => {
  const [err, todo] = await asyncWrapper(TodosController.create(req.body));
  if (!err) {
    return res.json(todo);
  }
  return next(err);
});

router.patch('/:id', async (req, res, next) => {
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

router.get('/?limit=10&skip=0&status=$value', async (req, res) => {
  const todos = await TodosController.find(req.query);
  res.json(todos);
});

module.exports = router;
