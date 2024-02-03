const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const {
  celebrate,
  Joi,
} = require('celebrate');
const { errors } = require('celebrate');
const dotenv = require('dotenv');
const {
  login,
  createUser,
} = require('./controllers/users');
const authMiddleware = require('./middlewares/auth');
const errorHandler = require('./middlewares/err-handler');
const {
  requestLogger,
  errorLogger,
} = require('./middlewares/logger');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const constants = require('./utils/constants');

dotenv.config();

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post(
  '/signin',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string()
          .required(),
      }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object()
      .keys({
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string()
          .required(),
        name: Joi.string()
          .min(2)
          .max(30),
        about: Joi.string()
          .min(2)
          .max(30),
        avatar: Joi.string()
          .pattern(/https?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#@!$&'()*+,;=]+$/),
      }),
  }),
  createUser,
);

app.use(authMiddleware);

app.use('/', usersRouter);

app.use('/', cardsRouter);


app.use('*', (req, res, next) => {
  next({
    status: constants.HTTP_STATUS.NOT_FOUND,
    message: constants.ERROR_MESSAGES.NOT_FOUND_MESSAGE,
  });
});

app.use(errorHandler);

app.use(errors());

app.use(errorLogger);

app.listen(PORT);
