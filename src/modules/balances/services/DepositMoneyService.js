const { Sequelize } = require('sequelize');
const {
  sequelize, Profile, Contract, Job,
} = require('../../../repositories/entities/model');

const { AppError } = require('../../../errors/AppError');

const DEPOSIT_PERCENTUAL_FACTOR = 0.25;

class DepositMoneyService {
  async execute(userId, profileId, depositValue) {
    if (userId.toString() !== profileId.toString()) {
      throw new AppError('Not possible to add money to the user account', 400);
    }

    const client = await Profile.findOne({
      where: {
        id: userId,
        type: 'client',
      },
    });

    if (!client) {
      throw new AppError('Client not found', 404);
    }

    const { dataValues } = await Job.findOne(
      {
        attributes: [
          'Contract.ClientId',
          [sequelize.fn('sum', sequelize.col('price')), 'total'],
        ],
        where: {
          paymentDate: { [Sequelize.Op.is]: null },
          [Sequelize.Op.or]: [
            { paid: { [Sequelize.Op.is]: null } },
            { paid: { [Sequelize.Op.is]: false } },
          ],
        },
        include: [
          {
            model: Contract,
            attributes: ['ClientId'],
            where: { ClientId: userId },
          },
        ],
        group: ['Contract.ClientId'],
      },
    );

    const totalJobsToPay = dataValues.total ?? 0;

    const limitValueToPay = totalJobsToPay * DEPOSIT_PERCENTUAL_FACTOR;

    if (depositValue > limitValueToPay) {
      throw new AppError(`Value exceeds 25%, max value to pay: ${limitValueToPay}`, 400);
    }

    await Profile.increment({ balance: depositValue }, { where: { id: userId } });
  }
}

module.exports = {
  DepositMoneyService,
};
