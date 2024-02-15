const jwt = require('jsonwebtoken');
const CustomError = require('../lib/custom-error');
const secretKey = process.env.key || 'test';
const validateUserData = (req, res, next) => {
  try {
    const token = req.get('authorization');
    const verified = jwt.verify(token, secretKey);
    if (verified) {
      req.user = verified._id;
      return next();
    }
    throw new CustomError('UNAUTHORIZED', 403);
  } catch (error) {
    throw new CustomError('Invalid token', 403);
  }
};
module.exports = {
  validateUserData,
};
