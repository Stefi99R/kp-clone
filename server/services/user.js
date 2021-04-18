"use strict";

const { User } = require('../database/models');

const getUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({ attributes: { exclude: ['password'] } });
        res.json(users);
    } catch (error) {
        return next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
        res.json(user);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getUsers,
    getUser
}