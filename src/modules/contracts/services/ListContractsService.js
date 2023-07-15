const { Sequelize } = require('sequelize');
const { Contract } = require('../../../repositories/entities/model');

class ListContractsService {
  async execute(profileId) {
    const contracts = await Contract.findAll({
      where: {
        status: {
          [Sequelize.Op.ne]: 'terminated',
        },
        [Sequelize.Op.or]: [
          { ContractorId: profileId },
          { ClientId: profileId },
        ],
      },
    });

    return contracts;
  }
}

module.exports = {
  ListContractsService,
};
