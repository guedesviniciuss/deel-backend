const { DepositMoneyService } = require('../services/DepositMoneyService');

const depositMoneyService = new DepositMoneyService();

class DepositMoneyController {
  async run(req, res) {
    const profileId = req.profile.id;

    const { userId } = req.params;
    const { depositValue } = req.body;

    await depositMoneyService.execute(userId, profileId, depositValue);

    res.status(200).send();
  }
}

module.exports = {
  DepositMoneyController,
};
