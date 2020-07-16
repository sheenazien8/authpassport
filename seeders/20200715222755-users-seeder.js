'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    await queryInterface.bulkInsert('Users', [{
      email: 'admin@example.com',
      firstName: 'admin',
      lastName: 'kulon',
      password: bcrypt.hashSync('12345678', 10),
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
