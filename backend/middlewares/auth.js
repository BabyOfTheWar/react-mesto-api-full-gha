const jwt = require('jsonwebtoken');
const constants = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, constants.JWT_SECRET);
  } catch (error) {
    return res.status(401).json({ message: 'Требуется авторизация' });
  }

  req.user = payload;

  next();
};
