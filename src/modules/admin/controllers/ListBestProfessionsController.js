const { ListBestProfessionsService } = require('../services/ListBestProfessionsService');

const listBestProfessionsService = new ListBestProfessionsService();

class ListBestProfessionsController {
  async run(req, res) {
    const { start, end } = req.query;

    const bestProfessions = await listBestProfessionsService.execute(start, end);

    res.status(200).json({ bestProfessions });
  }
}

module.exports = {
  ListBestProfessionsController,
};
