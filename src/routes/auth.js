import express from "express";

import AuthController from "../controllers/auth";
import AuthMiddleware from "../middlewares/auth";

import { validateInput, validateToken } from "../middlewares";

import {
  validateSignupInput,
  validateLoginInput,
  validateVerifyPhoneCodeInput,
  validatePasswordResetEmailVerificationInput,
  validatePasswordResetInput
} from "../validations/auth";

const Router = express.Router();

const authController = new AuthController();
const authMiddeware = new AuthMiddleware();

const { validateSignup } = authMiddeware;
const {
  register,
  login,
  verifyPhoneCode,
  passwordResetEmailVerification,
  passwordResetCodeVerification,
  passwordReset
} = authController;

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
Router.post(
  "/register",
  validateInput(validateSignupInput),
  validateSignup,
  register
);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
Router.post("/login", validateInput(validateLoginInput), login);

// @route   POST api/auth/verifyphonecode
// @desc    Verify phone code
// @access  Private
Router.post(
  "/verifyphonecode",
  validateToken,
  validateInput(validateVerifyPhoneCodeInput),
  verifyPhoneCode
);

// @route   POST api/auth/password-reset-email-verification
// @desc    Password reset email verification
// @access  Public
Router.post(
  "/password-reset-email-verification",
  validateInput(validatePasswordResetEmailVerificationInput),
  passwordResetEmailVerification
);

// @route   POST api/auth/password-reset-code-verification
// @desc    Password reset code verification
// @access  Public
Router.post(
  "/password-reset-code-verification",
  validateToken,
  validateInput(validateVerifyPhoneCodeInput),
  passwordResetCodeVerification
);

// @route   POST api/auth/password-reset
// @desc    Verify phone code
// @access  Private
Router.post(
  "/password-reset",
  validateToken,
  validateInput(validatePasswordResetInput),
  passwordReset
);

export default Router;
