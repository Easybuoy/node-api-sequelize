"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.myAssociation = this.hasMany(models.User, {
        foreignKey: "userType",
        as: "users",
        onDelete: "CASCADE",
      });
    }
  }
  UserType.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserType",
    }
  );
  return UserType;
};
