require('express-async-errors');

const express = require('express');
const bodyParser = require('body-parser');

const { AppError } = require('./errors/AppError');
const { sequelize } = require('./repositories/entities/model');
const { routes } = require('./routes');

const app = express();
app.use(bodyParser.json());
app.set('sequelize', sequelize);
app.set('models', sequelize.models);
app.use(routes);

app.use(
  (err, _request, response, _next) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: 'ERROR', message: err.message });
    }

    return response
      .status(500)
      .json({ status: 'error', message: 'Internal server error' });
  },
);

module.exports = app;
