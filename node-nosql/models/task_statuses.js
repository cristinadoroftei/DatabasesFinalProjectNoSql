const DataTypes = require('sequelize');

const sequelize = require('../util/database');

module.exports = sequelize.define(
  'task_statuses',
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
        model: 'status_categories',
        key: 'id',
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'task_statuses',
    hasTrigger: true,
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }],
      },
      {
        name: 'FKTask_Statu982149',
        using: 'BTREE',
        fields: [{ name: 'status_category_id' }],
      },
      {
        name: 'task_statuses_project_id_foreign_idx',
        using: 'BTREE',
        fields: [{ name: 'project_id' }],
      },
    ],
  }
);
