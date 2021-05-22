"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "project_statuses",
          "company_id",
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: "companies",
              key: "id",
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("project_statuses", "company_id", {
          transaction: t,
        }),
      ]);
    });
  },
};
