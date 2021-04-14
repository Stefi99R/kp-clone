"use strict";

const { Ad, User } = require('../database/models');
const { Op, fn, col } = require('sequelize');

const getAds = async (req, res, next) => {
    try {
        let {
            sortBy = "createdAt",
            asc = true,
            onlyMe = '',
            limit = 20,
            category = "",
            price,
            search = ""
        } = req.query;
        
        const where = {},
        // for filtering
        if (onlyMe !== '') {
            where.userId = onlyMe;
        }
        if (category !== "") {
            where.category = category;
        }
        if (price === 'min') {
            sortBy = fn('min', col('price'));
        } else if (price === 'max') {
            sortBy = fn('max', col('price'));
        }
        if (search !== "") {
            where.name = { [Op.iLike]: '%' + seacrh + '%' }
        }
        
        const ads = await Ad.findAll({
            group: ["Ad.id", "User.id"],
            where,
            order: [[sortBy, asc ? "ASC" : "DESC"]],
            limit,
            include: [{
                model: User,
                attributes: ['username', 'phone', 'createdAt'],
            }]
        });

        res.json(ads);

    } catch (error) {
        return next(error);
    }
};

const getAd = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ad = await Ad.findByPk(id, {
            include: [{
                model: User,
                attributes: ['username', 'phone', 'createdAt'],
            }]
        });

        res.json(ad);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAds,
    getAd
}