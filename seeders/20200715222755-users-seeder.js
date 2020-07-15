'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        await queryInterface.bulkInsert('users', [{
            email: 'admin@example.com',
            firstName: 'admin',
            lastName: 'kulon',
            password: bcrypt.hashSync('12345678', bcrypt.genSaltSync(saltRounds)),
            createdAt: new Date(),
            updatedAt: new Date()
        }], {})
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
