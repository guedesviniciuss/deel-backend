const { Router } = require('express');

const { ListBestClientsController } = require('../modules/admin/controllers/ListBestClientsController');
const { ListBestProfessionsController } = require('../modules/admin/controllers/ListBestProfessionsController');

const adminRoutes = Router();

const listBestProfessionsController = new ListBestProfessionsController();
const listBestClientsController = new ListBestClientsController();

adminRoutes.get('/best-profession', listBestProfessionsController.run);
adminRoutes.get('/best-clients', listBestClientsController.run);

module.exports = {
  adminRoutes,
};
