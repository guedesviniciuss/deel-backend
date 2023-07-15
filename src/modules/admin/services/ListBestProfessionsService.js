const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../../repositories/entities/model');

class ListBestProfessionsService {
  async execute(start, end) {
    const queryCondition = start && end ? `
    WHERE
    Jobs.paymentDate IS NOT NULL AND Jobs.paymentDate BETWEEN '${start}' AND '${end}'
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
