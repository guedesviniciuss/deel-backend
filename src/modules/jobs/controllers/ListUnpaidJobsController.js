const { ListUnpaidJobsService } = require('../services/ListUnpaidJobsService');

const listUnpaidJobsService = new ListUnpaidJobsService();

class ListUnpaidJobsController {
  async run(req, res) {
    const profileId = req.profile.id;

    const unpaidJobs = await listUnpaidJobsService.execute(profileId);
    res.json({ unpaidJobs });
  }
}

module.exports = {
  ListUnpaidJobsController,
};
