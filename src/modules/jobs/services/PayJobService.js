const { AppError } = require('../../../errors/AppError');
const {
  sequelize, Job, Contract, Profile,
} = require('../../../repositories/entities/model');

class PayJobService {
  async execute(jobId, profile) {
    const { id: profileId, balance: profileBalance } = profile;

    const job = await Job.findOne({ where: { id: jobId } });

    if (!job) {
      throw new AppError('Job id not found', 404);
    }

    if (job.paid) {
      throw new AppError('Job already paid', 403);
    }

    const contract = await Contract.findOne({
      where: {
        id: job.ContractId,
      },
    });

    if (profileId !== contract.ClientId) {
      throw new AppError('User not in the contract', 403);
    }

    const jobPrice = job.price;

    if (profileBalance < jobPrice) {
      throw new AppError('Insufficient funds', 400);
    }

    let transaction;
    try {
      transaction = await sequelize.transaction();

      // withdrall from client
      await Profile.decrement({ balance: jobPrice }, { where: { id: profileId } }, { transaction });

      // adds at contractor's account
      await Profile.increment(
        { balance: jobPrice },
        { where: { id: contract.ContractorId } },
        { transaction },
      );

      // change payment status
      await Job.update(
        { paid: true, paymentDate: new Date() },
        { where: { id: job.id } },
        { transaction },
      );
      await transaction.commit();
    } catch (err) {
      if (transaction) {
        await transaction.rollback();
      }
      throw new AppError('Something wrong happened, try again later', 400);
    }
  }
}

module.exports = {
  PayJobService,
};
