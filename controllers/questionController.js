const { Questions } = require('../models/models');

class QuestionController {
  async create(req, res) {
    const { userId, sectionId, header, markers, is_vip } = req.body;
    const question = await Questions.create({userId, sectionId, header, markers, is_vip });
    return res.json(question);
  }

  async getAll(req, res) {
    let { userId, sectionId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let questions;
    if (!userId && !sectionId) {
        questions = await Questions.findAndCountAll({limit, offset});
    }
    if (userId && !sectionId) {
        questions = await Questions.findAndCountAll({where: {userId}, limit, offset});
    }
    if (!userId && sectionId) {
        questions = await Questions.findAndCountAll({where: {sectionId}, limit, offset});
    }
    if (userId && sectionId) {
        questions = await Questions.findAndCountAll({where: {userId, sectionId}, limit, offset});
    }
    return res.json(questions);
  }
    async getOne(req, res) {
        const { id } = req.params;
        const question = await Questions.findOne({ where: { id } });
        return res.json(question);
    }
    async delete(req, res) {
        const { id } = req.params;
        const question = await Questions.destroy({ where: { id } });
        return res.json(question);
    }
}

module.exports = new QuestionController();