"use strict";

const { Model } = require('sequelize');
const { genSalt, hash, compare } = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    class User extends Model {

        static findByUsername(username, options) {
            return User.findOne({ where: { username }, ...options });
        }

        static async hashPassword(password) {
            try {
                const salt = await genSalt();
                const passwordHash = await hash(password, salt);
                return passwordHash;
            } catch (error) {
                throw error;
            }
        }

        static comaprePasswords(password, passwordHash) {
            try {
                return compare(password, passwordHash);
            } catch (error) {
                return error;
            }
        }

        static associate(models) {
            User.hasMany(models.Ad, {
                sourceKey: "id",
                foreignKey: "userId"
            });
        }
    }

    User.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            username: {
                allowNull: false,
                unique: true,
                type: DataTypes.STRING
                // other validations (like max and min length) can be added, according to someones will 
            },
            password: {
                allowNull: true,
                type: DataTypes.STRING,
                exclude: true
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: false
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            deletedAt: {
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: "User",
            paranoid: true,
            timestamps: true
        }
    );

    return User;
};