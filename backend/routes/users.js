const express = require('express');
const {
  celebrate,
  Joi,
} = require('celebrate');
const {
  getUsers,
  getUserById,
  updateProfile,
  updateAvatar,
  getUserMe,
} = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();


router.get('/api/users', authMiddleware, getUsers);

router.get('/api/users/me', authMiddleware, getUserMe);

router.get('/api/users/:userId', authMiddleware, celebrate({
  params: Joi.object()
    .keys({
      userId: Joi.string()
        .length(24)
        .hex()
        .required(),
    }),
}), getUserById);

router.patch('/api/users/me', authMiddleware, celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string()
        .min(2)
        .max(30),
      about: Joi.string()
        .min(2)
        .max(30),
    }),
}), updateProfile);

router.patch('/api/users/me/avatar', authMiddleware, celebrate({
  body: Joi.object()
    .keys({
      avatar: Joi.string()
        .pattern(/https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#@!$&'()*+,;=]+$/)
        .required(),
    }),
}), updateAvatar);

module.exports = router;
