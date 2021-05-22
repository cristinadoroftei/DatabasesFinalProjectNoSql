const DataTypes = require("sequelize");

const sequelize = require("../util/database");

module.exports = sequelize.define(
  "time_registrations",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tasks",
        key: "id",
      },
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "persons",
        key: "id",
      },
    },
    minutes_registered: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    time_reg_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    locked: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "time_registrations",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "FKTime_Regis927685",
        using: "BTREE",
        fields: [{ name: "task_id" }],
      },
      {
        name: "FKTime_Regis835468",
        using: "BTREE",
        fields: [{ name: "person_id" }],
      },
    ],
  }
);
