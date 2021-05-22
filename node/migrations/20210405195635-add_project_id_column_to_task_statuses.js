"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    //https://sequelize.org/master/manual/migrations.html#migration-skeleton
    //https://stackoverflow.com/questions/46357533/how-to-add-delete-new-columns-in-sequelize-cli
    // use an automatically-managed transaction to ensure that all instructions are successfully executed or rolled back in case of failure
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "task_statuses",
          "project_id",
          {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
              model: "projects",
              key: "id",
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("task_statuses", "project_id", {
          transaction: t,
        }),
      ]);
    });
  },
};
