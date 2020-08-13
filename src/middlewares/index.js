import models from "../database/models";
import { verifyToken } from "../utils";

/**
 * validateInput
 * @param {function} validationMethod
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} object
 * @description This function returns object of validations required.
 */
export const validateInput = (validationMethod) => (req, res, next) => {
  const { errors, isValid } = validationMethod(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json({ status: "error", errors });
  }

  next();
};

/**
 * Validate Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object} object
 * @description This function checks if token provided is valid.
 */
export const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ status: "error", message: "No Token Provided" });
  }

  try {
    const data = verifyToken(token);

    if (data) {
      req.user_id = data.id;
      const existingUser = await models.User.findOne({
        where: { id: req.user_id },
      });
      if (!existingUser) {
        return res
          .status(404)
          .json({ status: "error", message: "User Not Found" });
      }
      req.user = existingUser;
      next();
    }
  } catch (error) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid Token Provided" });
  }
};
