const { Router } = require('express');

const { ListUnpaidJobsController } = require('../modules/jobs/controllers/ListUnpaidJobsController');
const { PayJobController } = require('../modules/jobs/controllers/PayJobController');

const listUnpaidJobsController = new ListUnpaidJobsController();
const payJobController = new PayJobController();

const jobsRoutes = Router();

jobsRoutes.get('/unpaid', listUnpaidJobsController.run);
jobsRoutes.post('/:job_id/pay', payJobController.run);

module.exports = {
  jobsRoutes,
};
