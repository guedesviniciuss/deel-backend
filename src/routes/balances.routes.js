const { Router } = require('express');

const { DepositMoneyController } = require('../modules/balances/controllers/DepositMoneyController');

const balanceRoutes = Router();

const depositMoneyController = new DepositMoneyController();

balanceRoutes.post('/deposit/:userId', depositMoneyController.run);

module.exports = {
  balanceRoutes,
};
