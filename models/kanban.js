"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class kanban extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  kanban.init(
    {
      name: DataTypes.STRING,
      data: DataTypes.JSON,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "kanban",
    }
  );
  return kanban;
};
