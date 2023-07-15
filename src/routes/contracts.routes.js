const { Router } = require('express');

const { FindOneContractController } = require('../modules/contracts/controllers/FindOneContractController');
const { ListContractsController } = require('../modules/contracts/controllers/ListContractsController');

const contractRoutes = Router();

const listContractsController = new ListContractsController();
const findOneContractController = new FindOneContractController();

contractRoutes.get('/', listContractsController.run);
contractRoutes.get('/:id', findOneContractController.run);

module.exports = {
  contractRoutes,
};
