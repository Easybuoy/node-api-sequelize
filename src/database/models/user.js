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
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
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
  return User;
};
