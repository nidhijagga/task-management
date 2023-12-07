const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Task = sequelize.define(
  'Task',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Completed', 'Not Completed'),
      defaultValue: 'Not Completed',
      allowNull: false,
    },
  },
  {
    tableName: 'tasks',
  }
);

module.exports = Task;
