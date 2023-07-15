const { Sequelize } = require('sequelize');
const { Contract, Job } = require('../../../repositories/entities/model');

class ListUnpaidJobsService {
  async execute(profileId) {
    const contracts = await Contract.findAll({
      where: {
        status: 'in_progress',
        [Sequelize.Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
      },
    });

    const unpaidJobs = await Job.findAll({
      where: {
        ContractId: contracts.map((contract) => contract.id),
        paid: null,
      },
    });

    return unpaidJobs;
  }
}

module.exports = {
  ListUnpaidJobsService,
};
