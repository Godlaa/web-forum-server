const ApiError = require('../error/ApiError');
const { Answers } = require('../models/models');

class AnswerController{
    async create(req, res){
        const {questionId, userId, text, likes} = req.body;
        const answer = await Answers.create({questionId, userId, text, likes});
        return res.json(answer);
    }
    async getAll(req, res, next){
        let { questionId, userId } = req.query;
        let answers;
        try {
            if (!userId && !questionId) {
                answers = await Answers.findAll();
            }
            if (userId && !questionId) {
                answers = await Answers.findAll({where: {userId}});
            }
            if (!userId && questionId) {
                answers = await Answers.findAll({where: {questionId}});
            }
            if (userId && questionId) {
                answers = await Answers.findAll({where: {userId, questionId}});
            }
            return res.json(answers);
        }
        catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getOne(req, res){
        const {id} = req.params;
        const answer = await Answers.findOne(
            {where: {id}}
        );
        return res.json(answer);
    }
    async delete(req, res){
        const {id} = req.params;
        const answer = await Answers.destroy(
            {where: {id}}
        );
        return res.json(answer);
    }
}

module.exports = new AnswerController();