const { FindOneContractService } = require('../services/FindOneContractService');

const findOneContractService = new FindOneContractService();

class FindOneContractController {
  async run(req, res) {
    const { id: contractId } = req.params;
    const profileId = req.profile.id;

    const contract = await findOneContractService.execute(contractId, profileId);

    return res.status(200).json(contract);
  }
}

module.exports = {
  FindOneContractController,
};
