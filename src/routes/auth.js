import express from 'express';

import AuthController from '../controllers/auth';
import AuthMiddleware from '../middlewares/auth';

import { validateInput, validateToken } from '../middlewares';

import { validateSignupInput, validateLoginInput } from '../validations/auth';

const Router = express.Router();

const authController = new AuthController();
const authMiddeware = new AuthMiddleware();

const { validateSignup } = authMiddeware;
const { register, login } = authController;

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
Router.post(
  '/register',
  validateInput(validateSignupInput),
  validateSignup,
  register
);

// @route   POST api/auth/login
// @desc    Login user
// @access  Public
Router.post('/login', validateInput(validateLoginInput), login);

export default Router;
