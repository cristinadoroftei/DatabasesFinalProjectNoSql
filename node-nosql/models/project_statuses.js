const DataTypes = require("sequelize");

const sequelize = require("../util/database");

module.exports = sequelize.define(
  "project_statuses",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status_category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "status_categories",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "companies",
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "project_statuses",
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "FKProject_St38885",
        using: "BTREE",
        fields: [{ name: "status_category_id" }],
      },
      {
        name: "project_statuses_company_id_foreign_idx",
        using: "BTREE",
        fields: [{ name: "company_id" }],
      },
    ],
  }
);
