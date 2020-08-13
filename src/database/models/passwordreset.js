"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PasswordReset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = this.hasMany(models.User, {
        foreignKey: "id",
        as: "user",
        sourceKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  PasswordReset.init(
    {
      code: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      isResetCodeSent: DataTypes.BOOLEAN,
      isResetCodeVerified: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PasswordReset",
    }
  );

  PasswordReset.prototype.validatePhoneVerificationCode = function (phoneCode) {
    return this.code === parseInt(phoneCode);
  };
  return PasswordReset;
};
