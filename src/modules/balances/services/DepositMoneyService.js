const { Op } = require('sequelize');
const {
  sequelize, Profile, Contract, Job,
} = require('../../../repositories/entities/model');

const { AppError } = require('../../../errors/AppError');

const DEPOSIT_PERCENTUAL_FACTOR = 0.25;

class DepositMoneyService {
  async execute(userId, depositValue) {
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
          paymentDate: { [Op.is]: null },
          [Op.or]: [
            { paid: { [Op.is]: null } },
            { paid: { [Op.is]: false } },
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
      throw new AppError(`Value exceeds 25%, max value to pay: ${limitValueToPay}`, 404);
    }

    await Profile.increment({ balance: depositValue }, { where: { id: userId } });
  }
}

module.exports = {
  DepositMoneyService,
};
