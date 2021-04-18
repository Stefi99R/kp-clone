"use strict";

const { Ad, User } = require('../database/models');
const { Op, fn, col } = require('sequelize');

const getAds = async (req, res, next) => {
    try {
        let {
            sortBy = "createdAt",
            asc = false,
            onlyMe = '',
            limit = 20,
            category = "",
            price = "",
            search = "",
            offset = 0,
        } = req.query;

        const where = {};
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
            where.name = { [Op.iLike]: '%' + search + '%' }
        }

        const options = {
            group: ["Ad.id", "User.id"],
            where,
            order: [[sortBy, asc ? "ASC" : "DESC"]],
            include: [{
                model: User,
                attributes: ['username', 'phone'],
            }]
        };

        const ads = await Ad.findAll({ ...options, limit, offset });
        const total = await Ad.findAndCountAll(options);
        res.json({ ads: ads, total: Math.ceil(total.rows.length / limit) });

    } catch (error) {
        return next(error);
    }
};

const paginationAdInfo = async (req, res, next) => {

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

const storeAd = async (req, res, next) => {
    const { id } = req.user;
    try {
        const { name, description, url, price, category, city } = req.body;
        const store = await Ad.create({
            name,
            description,
            url,
            price,
            category,
            city,
            count: 0,
            userId: id
        });
        res.json(store);
    } catch (error) {
        return next(error);
    }
};

const updateAd = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { id: adId } = req.params;
        const oldAd = await Ad.findByPk(adId, {
            include: [{
                model: User,
                attributes: ['id']
            }]
        });
        if (oldAd.User.id !== id) {
            res.status(400).send({ msg: "This account is not the owner of this ad" });
        }

        const updateAd = req.body;
        const ad = await Ad.update(updateAd, { where: { id: adId } });

        res.json(ad);

    } catch (error) {
        return next(error);
    }
};

const removeAd = async (req, res, next) => {
    try {
        const { id } = req.user;
        const { id: adId } = req.params;
        const oldAd = await Ad.findByPk(adId, {
            include: [{
                model: User,
                attributes: ['id']
            }]
        });
        if (oldAd === null) {
            res.status(400).send({ msg: "There is no ad with that id!" });
        } else if (oldAd.User.id !== id) {
            res.status(400).send({ msg: "This account is not the owner of this ad." });
        }

        await Ad.destroy({ where: { id: adId } });

        res.json({
            success: "true",
            status: "OK",
            msg: "Ad successfully deleted"
        });

    } catch (error) {
        return next(error);
    }
};

const countUp = async (req, res, next) => {
    try {
        const { id } = req.params;
        const ad = await Ad.increment({ count: +1 }, { where: { id } });

        res.json(ad);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getAds,
    getAd,
    storeAd,
    updateAd,
    removeAd,
    countUp
}