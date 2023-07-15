const { Sequelize } = require('sequelize');

const { Contract } = require('../../../repositories/entities/model');
const { AppError } = require('../../../errors/AppError');

class FindOneContractService {
  async execute(contractId, profileId) {
    const contract = await Contract.findOne({
      where: {
        id: contractId,
        [Sequelize.Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId },
        ],
      },
    });

    if (!contract) {
      throw new AppError('Contract not found', 404);
    }

    return contract;
  }
}

module.exports = {
  FindOneContractService,
};
