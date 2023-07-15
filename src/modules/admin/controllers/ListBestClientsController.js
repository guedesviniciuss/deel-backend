const { ListBestClientsService } = require('../services/ListBestClientsService');

const listBestClientsService = new ListBestClientsService();

class ListBestClientsController {
  async run(req, res) {
    const { start, end, limit } = req.query;

    const bestClients = await listBestClientsService.execute(start, end, limit);

    res.status(200).json(bestClients);
  }
}

module.exports = {
  ListBestClientsController,
};
