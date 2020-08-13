"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SmsLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  SmsLog.init(
    {
      request: DataTypes.TEXT,
      response: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "SmsLog",
    }
  );
  return SmsLog;
};
