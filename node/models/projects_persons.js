const DataTypes = require("sequelize");

const sequelize = require("../util/database");

module.exports = sequelize.define(
  "projects_persons",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    person_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Persons",
        key: "id",
      },
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: "Projects",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "projects_persons",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }, { name: "person_id" }, { name: "project_id" }],
      },
      {
        name: "FKProjects_P978121",
        using: "BTREE",
        fields: [{ name: "person_id" }],
      },
      {
        name: "FKProjects_P522689",
        using: "BTREE",
        fields: [{ name: "project_id" }],
      },
    ],
  }
);
