const { PayJobService } = require('../services/PayJobService');

const payJobService = new PayJobService();

class PayJobController {
  async run(req, res) {
    const { profile } = req;
    const { job_id: jobId } = req.params;

    await payJobService.execute(jobId, profile);

    res.status(200).send();
  }
}

module.exports = {
  PayJobController,
};
