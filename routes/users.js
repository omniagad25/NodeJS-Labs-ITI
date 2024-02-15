const router = require('express').Router();
const { UsersController } = require('../controllers');
const asyncWrapper = require('../lib/async-wrapper');

router.post('/', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.create(req.body));
  if (!err) {
    return res.json(user);
  }
  return next(err);
});

router.post('/login', async (req, res, next) => {
  const { userName, password } = req.body;
  const [err, token] = await asyncWrapper(UsersController.userLogin(userName, password));
  if (!token) {
    return res.json(token);
  }
  return next();
});

router.get('/', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.getAllUsers());
  if (!err) {
    return res.json(user);
  }
  return next(err);
});

router.get('/:id/todos', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.getUser(req.params.id));
  if (!err) {
    return res.json(user);
  }
  return next(err);
});

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await UsersController.findOne({ email });
//   const valid = await user.verifyPassword(password);
//   return res.json({ valid });
// });

router.delete('/:id', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.deleteUser(req.params.id));
  if (!err) {
    return res.json(user);
  }
  return next(err);
});

router.patch('/:id', async (req, res, next) => {
  const [err, user] = await asyncWrapper(UsersController.updateUser(req.params.id, req.body));
  if (!err) {
    return res.json(user);
  }
  return next(err);
});

router.get('/:userid/todos', async (req, res, next) => {
  const [err, todos] = await asyncWrapper(UsersController.getUserTodos(req.params.userid));
  if (!err) {
    return res.json(todos);
  }
  return next(err);
});

module.exports = router;
