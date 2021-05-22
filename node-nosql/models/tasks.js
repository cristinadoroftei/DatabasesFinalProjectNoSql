const DataTypes = require("sequelize");

const sequelize = require("../util/database");

module.exports = sequelize.define(
  "tasks",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "projects",
        key: "id",
      },
    },
    task_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "task_statuses",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    minutes_estimated: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    locked_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "tasks",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "FKTasks528675",
        using: "BTREE",
        fields: [{ name: "project_id" }],
      },
      {
        name: "FKTasks111043",
        using: "BTREE",
        fields: [{ name: "task_status_id" }],
      },
    ],
  }
);
