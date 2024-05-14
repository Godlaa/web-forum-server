const uuid = require('uuid');
const path = require('path');
const {Users_Personal_info} = require('../models/models');
const ApiError = require('../error/ApiError');

class UserInfoController{
    async create(req, res, next) {
        try {  
            const {userId, name, surname, age, faculty, group, course} = req.body;
            const {avatar} = req.files;
            let fileName = uuid.v4() + ".jpg";
            avatar.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Users_Personal_info.create({userId, name, surname, age, faculty, group, course, avatar: fileName});
            return res.json(device);
        }
        catch(e) {
            next(ApiError.badRequest(e.message));
        }
      }
      
    async getAll(req, res) {
        const users_info = await Users_Personal_info.findAll();
        return res.json(users_info);
    }
    async getOne(req, res) {
        const {id} = req.params;
        const user_info = await Users_Personal_info.findOne(
            {where: {id}}
        );
        return res.json(user_info);
    }
    async delete(req, res) {
        const {id} = req.params;
        const user_info = await Users_Personal_info.destroy(
            {where: {id}}
        );
        return res.json(user_info);
    }
}

module.exports = new UserInfoController();