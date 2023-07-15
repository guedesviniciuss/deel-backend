const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../../repositories/entities/model');

class ListBestClientsService {
  async execute(start, end, limit = 2) {
    const queryCondition = start && end ? `WHERE
    Jobs.paid=true AND Jobs.paymentDate BETWEEN '${start}' AND '${end}'` : '';

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
