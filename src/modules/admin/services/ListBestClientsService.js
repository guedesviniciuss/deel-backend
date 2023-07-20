const { QueryTypes } = require('sequelize');

const { sequelize } = require('../../../repositories/entities/model');
const { validDate } = require('../../../utils/validDate');

const QUERY_LIMIT = 2;

class ListBestClientsService {
  async execute(start, end, limit = QUERY_LIMIT) {
    const startDate = validDate(start);
    const endDate = validDate(end);

    const queryCondition = start && end ? `WHERE
    Jobs.paid=true AND Jobs.paymentDate BETWEEN '${startDate}' AND '${endDate}'` : '';

    const rawQuery = `
      SELECT Profiles.id, Profiles.firstName || ' ' || Profiles.lastName as fullName, SUM(Jobs.price) as paid FROM Profiles
      INNER JOIN Contracts
      ON
        Profiles.id=Contracts.ClientId
      INNER JOIN Jobs
      ON
        Jobs.ContractId=Contracts.id
      ${queryCondition}
      GROUP BY
        Profiles.firstName
      ORDER BY
        SUM(Jobs.paid) DESC
      LIMIT ${limit};
    `;

    const clients = await sequelize.query(rawQuery, { type: QueryTypes.SELECT });
    return clients;
  }
}

module.exports = {
  ListBestClientsService,
};
