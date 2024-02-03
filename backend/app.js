const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const authMiddleware = require('./middlewares/auth');
const errorHandler = require('./middlewares/err-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

const apiRouter = express.Router();

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(/https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#@!$&'()*+,;=]+$/),
    }),
  }),
  createUser,
);

app.use(authMiddleware);

const usersRouter = require('./routes/users');

app.use('/', usersRouter);

const cardsRouter = require('./routes/cards');

app.use('/', cardsRouter);

app.use('/api', apiRouter);

app.use('*', (req, res) => res.status(404).json({ message: 'Такой страницы нет' }));

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
