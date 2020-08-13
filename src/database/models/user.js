"use strict";
const bcrypt = require("bcrypt");
require("dotenv").config();

const { SALT_ROUNDS } = process.env;

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = this.hasOne(models.UserType, {
        foreignKey: "type",
        as: "usertypes",
        sourceKey: "userType",
        onDelete: "CASCADE",
      });

      this.myAssociation = this.hasMany(models.PasswordReset, {
        foreignKey: "userId",
        as: "passwordreset",
        // sourceKey: "userId",
        onDelete: "CASCADE",
      });
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      isPhoneVerified: DataTypes.BOOLEAN,
      phoneVerificationCode: DataTypes.INTEGER,
      isPhoneVerificationCodeSent: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      userType: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user, options) => {
          user.password = await user.generatePasswordHash();
        },
        beforeUpdate: async (user, options) => {
          user.password = await user.generatePasswordHash();
        },
      },
    }
  );

  User.prototype.generatePasswordHash = function () {
    if (this.password) {
      return bcrypt.hashSync(this.password, parseInt(SALT_ROUNDS));
    }
    return null;
  };

  User.prototype.validatePassword = async function (password) {
    const isValid = await bcrypt.compareSync(password, this.password);
    return isValid;
  };

  User.prototype.validatePhoneVerificationCode = function (phoneCode) {
    return this.phoneVerificationCode === parseInt(phoneCode);
  };
  return User;
};
