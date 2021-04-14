'use strict';

const faker = require('faker');
const categoriesEnum = require('../../config/categories');

const ads = [...Array(100)].map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    url: faker.image.technics(),
    price: faker.commerce.price(),
    category: faker.random.arrayElement(categoriesEnum),
    userId: faker.datatype.number({ min:1, max:9}),
    city: faker.address.city(),
    count: faker.datatype.number(1000),
    createdAt: new Date(),
    updatedAt: new Date(),
}))

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert("Ads", [...ads]);
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete("Ads");
  }
};
