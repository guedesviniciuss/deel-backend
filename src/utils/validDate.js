const moment = require('moment');

const { AppError } = require('../errors/AppError');

// TODO: Deprecation, it would be better change for luxon or date-fns in future implementarions
const validDate = (date) => {
  const formattedDate = moment(date).parseZone().format('YYYY-MM-DD HH:mm:ss.SSS Z');

  if (!Number.isNaN(Number(formattedDate)) || !moment(formattedDate).isValid()) {
    throw new AppError('Invalid date format', 400);
  }

  return formattedDate;
};

module.exports = {
  validDate,
};
