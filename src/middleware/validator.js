const {
  body, query, validationResult,
} = require('express-validator');

const depositValidator = () => [
  body('depositValue').isFloat({ min: 0 }).notEmpty(),
];

const rangeDate = [
  query('start').optional(),
  query('end').optional(),
];

const bestClientValidator = () => [
  ...rangeDate,
  query('limit').isNumeric().optional(),
];

const bestProfessionValidator = () => [
  ...rangeDate,
  query('limit').isNumeric().optional(),
];

const validate = (request, response, next) => {
  const errors = validationResult(request);

  if (errors.isEmpty()) {
    return next();
  }

  return response.status(422).json(
    errors,
  );
};

module.exports = {
  depositValidator,
  bestClientValidator,
  bestProfessionValidator,
  validate,
};
