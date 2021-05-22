const DataTypes = require("sequelize");

const sequelize = require("../util/database");
module.exports = sequelize.define(
  "companies",
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    contact_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    contact_phone: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "companies",
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [{ name: "id" }],
      },
    ],
  }
);
