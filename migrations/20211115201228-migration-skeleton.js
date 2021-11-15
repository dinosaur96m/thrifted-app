'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'items',
      'storeId'
    )
  },

  down: async (queryInterface, Sequelize) => {
  queryInterface.addColumn(
    'items',
    'storeId'
  )
  }
};
