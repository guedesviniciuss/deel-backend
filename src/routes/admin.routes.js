const { Router } = require('express');

const { validate, bestClientValidator, bestProfessionValidator } = require('../middleware/validator');
const { ListBestClientsController } = require('../modules/admin/controllers/ListBestClientsController');
const { ListBestProfessionsController } = require('../modules/admin/controllers/ListBestProfessionsController');

const adminRoutes = Router();

const listBestProfessionsController = new ListBestProfessionsController();
const listBestClientsController = new ListBestClientsController();

adminRoutes.get('/best-profession', bestProfessionValidator(), validate, listBestProfessionsController.run);
adminRoutes.get('/best-clients', bestClientValidator(), validate, listBestClientsController.run);

module.exports = {
  adminRoutes,
};
