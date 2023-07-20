const { QueryTypes } = require('sequelize');

const { sequelize } = require('../../../repositories/entities/model');
const { validDate } = require('../../../utils/validDate');

class ListBestProfessionsService {
  async execute(start, end) {
    const startDate = validDate(start);
    const endDate = validDate(end);

    const queryCondition = start && end ? `
      WHERE
      Jobs.paymentDate IS NOT NULL AND Jobs.paymentDate BETWEEN '${startDate}' AND '${endDate}'
    ` : '';

    const rawQuery = `
      SELECT
        Profiles.profession,  SUM(Jobs.price) as price
      FROM
        Jobs
      INNER JOIN
        Contracts
      ON Jobs.ContractId=Contracts.id
      INNER JOIN
        Profiles
      ON
        Contracts.ClientId=Profiles.id
      ${queryCondition}
      GROUP BY
        Profiles.profession
      ORDER BY
        SUM(Jobs.price) DESC
    `;

    const profession = await sequelize.query(rawQuery, { type: QueryTypes.SELECT });
    return profession;
  }
}

module.exports = {
  ListBestProfessionsService,
};
