const DataTypes = require("sequelize");

const sequelize = require("../util/database");
module.exports = sequelize.define(
  "projects",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "companies",
        key: "id",
      },
    },
    client_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "companies",
        key: "id",
      },
    },
    project_status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "project_statuses",
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
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    billable: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "projects",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
      {
        name: "FKProjects588697",
        using: "BTREE",
        fields: [{ name: "company_id" }],
      },
      {
        name: "FKProjects965566",
        using: "BTREE",
        fields: [{ name: "client_id" }],
      },
      {
        name: "FKProjects548315",
        using: "BTREE",
        fields: [{ name: "project_status_id" }],
      },
    ],
  }
);
