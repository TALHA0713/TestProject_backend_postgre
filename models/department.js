'use strict';
const { Model } = require('sequelize');
const Sequelize = require('sequelize')

// const User = require('./user')
// const Project = require('./project')

module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Department.init({
    id: {
      type: Sequelize.UUIDV4, //UUIDV4 for generating random ID
      allowNull: false,
      primaryKey: true,
    },
    departmentName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'Departments',
  });
  return Department;
};