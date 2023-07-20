const { Router } = require('express');

const { getProfile } = require('../middleware/getProfile');

const { contractRoutes } = require('./contracts.routes');
const { jobsRoutes } = require('./jobs.routes');
const { balanceRoutes } = require('./balances.routes');
const { adminRoutes } = require('./admin.routes');

const routes = Router();

routes.use('/contracts', getProfile, contractRoutes);
routes.use('/jobs', getProfile, jobsRoutes);
routes.use('/balances', getProfile, balanceRoutes);
routes.use('/admin', adminRoutes);

module.exports = {
  routes,
  contractRoutes,
};
