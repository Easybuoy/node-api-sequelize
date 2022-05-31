import { Op } from "sequelize";

import models from "../database/models";
import BaseController from "../controllers/base";

class AuthMiddleware extends BaseController {
  /**
   * validateSignup
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object} object
   * @description This function validates the email and phone to see if it does not exist in the database.
   */
  async validateSignup(req, res, next) {
    const { email } = req.body;
    const existingUser = await models.User.findOne({
      where: {
        [Op.or]: [{ email: email }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return super.error(res, 400, "Email already exists");
      }
    }
    next();
  }
}

export default AuthMiddleware;
