import models from "../database/models";
import BaseController from "./base";
import { generatePhoneAuthCode, generateToken } from "../utils";
import TwilioService from "../services/twilio";
import configVariables from "../config";

const twilioController = new TwilioService();

const { sendAccountVerificationCode } = twilioController;
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
      const generatedPhoneAuthCode = generatePhoneAuthCode();
      const user = await models.User.create({
        ...req.body,
        isActive: true,
        phoneVerificationCode: generatedPhoneAuthCode,
      });

      const {
        fullName,
        email,
        phone,
        isPhoneVerified,
        isActive,
        createdAt,
        updatedAt,
      } = user;
      const body = `Dear ${fullName}, your phone number verification code is ${generatedPhoneAuthCode}.`;
      sendAccountVerificationCode(
        body,
        configVariables.TWILIO_PHONE_NUMBER,
        phone,
        user,
        "isPhoneVerificationCodeSent"
      );

      const userResponse = {
        fullName,
        email,
        phone,
        isPhoneVerified,
        isActive,
        createdAt,
        updatedAt,
      };
      return super.success(res, 201, "User registered successfully", {
        user: userResponse,
      });
    } catch (error) {
      return super.error(res, 500, "Unable to register user");
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
        include: [
          {
            model: models.UserType,
            as: "usertypes",
          },
        ],
      });

      if (user) {
        const isValidPassword = await user.validatePassword(password);
        if (isValidPassword) {
          const token = generateToken({
            email,
            id: user.id,
            userType: user.usertypes.name,
            isPhoneVerified: false,
          });
          return super.success(res, 200, "User login successful", {
            token,
          });
        }
        return super.error(res, 401, "Invalid login details!");
      }

      return super.error(res, 401, "Invalid login details!");
    } catch (error) {
      return super.error(res, 500, "Unable to login user");
    }
  }

  /**
   * Verify Phone Code Route
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/verifyphonecode
   * @description This function implements the logic for veryfing a new user.
   * @access Private
   */
  async verifyPhoneCode(req, res) {
    try {
      const { user } = req;
      const { phoneCode } = req.body;
      if (user.isPhoneVerified == true) {
        return super.error(res, 400, "Phone already verified");
      }

      if (user.validatePhoneVerificationCode(phoneCode)) {
        user.isPhoneVerified = true;
        await user.save();

        return super.success(res, 200, "Phone verified successfully");
      }

      return super.error(res, 400, "Invalid verification code");
    } catch (error) {
      return super.error(res, 500, "Unable to verify phone code");
    }
  }

  /**
   * passwordResetEmailVerification
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/passwordResetEmailVerification
   * @description This function implements the logic for passwordResetEmailVerification.
   * @access Public
   */
  async passwordResetEmailVerification(req, res) {
    try {
      const { email } = req.body;
      const user = await models.User.findOne({ where: { email } });
      if (user) {
        const code = generatePhoneAuthCode();
        const savePasswordReset = await models.PasswordReset.create({
          code,
          userId: user.id,
        });

        const token = generateToken({ id: user.id });

        const body = `Dear ${user.fullName}, your password reset code is ${code}.`;
        const sendCode = await sendAccountVerificationCode(
          body,
          configVariables.TWILIO_PHONE_NUMBER,
          user.phone,
          savePasswordReset,
          "isResetCodeSent"
        );

        return super.success(
          res,
          200,
          "Password reset code sent successfully",
          { token }
        );
      }
      return super.error(res, 400, "User not found");
    } catch (error) {
      return super.error(res, 500, "Unable to send password reset code");
    }
  }

  /**
   * passwordResetCodeVerification
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/passwordResetCodeVerification
   * @description This function implements the logic for passwordResetCodeVerification.
   * @access Public
   */
  async passwordResetCodeVerification(req, res) {
    try {
      const { phoneCode } = req.body;
      const passwordReset = await models.PasswordReset.findOne({
        where: { userId: req.user.id },
        order: [["id", "DESC"]],
      });

      if (passwordReset) {
        const validateCode = passwordReset.validatePhoneVerificationCode(
          phoneCode
        );

        if (validateCode) {
          passwordReset.isResetCodeVerified = true;
          await passwordReset.save();
          return super.success(
            res,
            200,
            "Password reset code verified successfully"
          );
        }

        return super.error(res, 400, "Invalid code");
      }
      return super.error(res, 400, "Reset code not found");
    } catch (error) {
      return super.error(res, 500, "Unable to send password reset code");
    }
  }

  /**
   * passwordReset
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   * @route POST api/auth/passwordReset
   * @description This function implements the logic for passwordReset.
   * @access Public
   */
  async passwordReset(req, res) {
    try {
      const { user } = req;
      const { password } = req.body;
      const passwordReset = await models.PasswordReset.findOne({
        where: { userId: req.user.id },
        order: [["id", "DESC"]],
      });

      if (!passwordReset.isResetCodeVerified) {
        return super.error(
          res,
          400,
          "Password reset code hasn't been verified yet"
        );
      }

      user.password = password;
      await user.save();

      return super.success(res, 200, "Password changed successfully");
    } catch (error) {
      return super.error(res, 500, "Unable to reset password");
    }
  }
}

export default Auth;
