const { Sections } = require('../models/models');
const ApiError = require('../error/ApiError');

class SectionController {
    async create(req, res, next) {
        try {
        const {name, discipline} = req.body;
        const section = await Sections.create({name, discipline});
        return res.json(section);
        }
        catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        const sections = await Sections.findAll();
        return res.json(sections);
    }
    async getOne(req, res) {
        const {id} = req.params;
        const section = await Sections.findOne(
            {where: {id}}
        );
        return res.json(section);
    }
    async delete(req, res) {
        const {id} = req.params;
        const section = await Sections.destroy(
            {where: {id}}
        );
        return res.json(section);
    }
}

module.exports = new SectionController();