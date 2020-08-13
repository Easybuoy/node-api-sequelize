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
    const { email, phone } = req.body;
    const existingUser = await models.User.findOne({
      where: {
        [Op.or]: [{ phone: req.body.phone }, { email: req.body.email }],
      },
    });

    if (existingUser) {
      if (
        existingUser.phone === req.body.phone &&
        existingUser.email === req.body.email
      ) {
        return super.error(res, 400, "Email and Phone already exists");
      }

      if (existingUser.phone === req.body.phone) {
        return super.error(res, 400, "Phone already exists");
      }

      if (existingUser.email === req.body.email) {
        return super.error(res, 400, "Email already exists");
      }
    }
    next();
  }
}

export default AuthMiddleware;
