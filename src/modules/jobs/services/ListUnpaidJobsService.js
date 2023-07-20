const { Sequelize } = require('sequelize');
const { Contract, Job } = require('../../../repositories/entities/model');

class ListUnpaidJobsService {
  async execute(profileId) {
    const unpaidJobs = await Job.findAll({
      include: {
        model: Contract,
        attributes: [],
        where: {
          [Sequelize.Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
          [Sequelize.Op.and]: [{ status: { [Sequelize.Op.eq]: 'in_progress' } }],
        },
      },
      where: {
        [Sequelize.Op.or]: [
          { paid: { [Sequelize.Op.is]: null } },
          { paid: { [Sequelize.Op.is]: false } },
        ],
      },
    });

    return unpaidJobs;
  }
}

module.exports = {
  ListUnpaidJobsService,
};
