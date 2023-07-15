const { ListContractsService } = require('../services/ListContractsService');

const listContractsService = new ListContractsService();

class ListContractsController {
  async run(req, res) {
    const profileId = req.profile.id;

    const contracts = await listContractsService.execute(profileId);

    return res.json({ contracts });
  }
}

module.exports = {
  ListContractsController,
};
