const { Router } = require('express');

const { validate, depositValidator } = require('../middleware/validator');
const { DepositMoneyController } = require('../modules/balances/controllers/DepositMoneyController');

const balanceRoutes = Router();

const depositMoneyController = new DepositMoneyController();

balanceRoutes.post('/deposit/:userId', depositValidator(), validate, depositMoneyController.run);

module.exports = {
  balanceRoutes,
};
