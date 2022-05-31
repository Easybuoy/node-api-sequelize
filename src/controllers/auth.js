import models from '../database/models';
import BaseController from './base';
import { generateToken } from '../utils';

class Auth extends BaseController {
  /**
   * Register Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/register
   * @description This function implements the logic for registering a new user.
   * @access Public
   */
  async register(req, res) {
    try {
      const user = await models.User.create({
        ...req.body,
        isActive: true,
      });

      const { email, isActive, createdAt, updatedAt } = user;

      const userResponse = {
        email,
        isActive,
        createdAt,
        updatedAt,
      };
      return super.success(res, 201, 'User registered successfully', {
        user: userResponse,
      });
    } catch (error) {
      return super.error(res, 500, 'Unable to register user');
    }
  }

  /**
   * Login Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/login
   * @description This function implements the logic for logging in a new user.
   * @access Public
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await models.User.findOne({
        where: { email },
      });

      if (user) {
        const isValidPassword = await user.validatePassword(password);
        if (isValidPassword) {
          const token = generateToken({
            email,
            id: user.id,
          });
          return super.success(res, 200, 'User login successful', {
            token,
          });
        }
        return super.error(res, 401, 'Invalid login details!');
      }

      return super.error(res, 401, 'Invalid login details!');
    } catch (error) {
      return super.error(res, 500, 'Unable to login user');
    }
  }
}

export default Auth;
