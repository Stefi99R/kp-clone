'use strict';
const faker = require('faker');

const users = [...Array(10)].map(() => ({
  username: faker.internet.userName(),
  password: faker.internet.password(8),
  phone: faker.phone.phoneNumber(),
  createdAt: new Date(),
  updatedAt: new Date(),
}));

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [...users]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users");
  }
};
