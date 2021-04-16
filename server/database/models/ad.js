"use strict";

const { Model } = require("sequelize");
const categoriesEnum = require("../../config/categories");

module.exports = (sequelize, DataTypes) => {

    class Ad extends Model {

        static associate(models) {
            Ad.belongsTo(models.User, {
                allowNull: false,
                foreignKey: "userId",
                targetKey: "id"
            });
        }

    }

    Ad.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },

            /** Name of the product */
            name: {
                allowNull: false,
                type: DataTypes.TEXT
            },

            /** Description of the product */
            description: {
                type: DataTypes.TEXT
            },

            /** URL of the image for the product */
            url: {
                type: DataTypes.TEXT
            },

            price: {
                allowNull: false,
                type: DataTypes.FLOAT
            },

            /** Category to which the product belongs to */
            category: {
                allowNull: false,
                type: DataTypes.ENUM(categoriesEnum)
            },

            /** ID of the user that posted the ad */
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER
            },

            /** City at which the user lives/store is located */
            city: {
                type: DataTypes.TEXT
            },

            /** Number of the views for the ad */
            count: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },

            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },

            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },

            deletedAt: {
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: "Ad",
            paranoid: true,
            timestamps: true
        }
    );

    return Ad;
};