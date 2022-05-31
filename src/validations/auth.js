import Validator from 'validator';
import isEmpty from './isEmpty';

const validateSignupInput = (input) => {
  const errors = {};
  const data = input;

  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password = String(data.password);

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!errors.email) {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  if (!errors.password) {
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = 'Password must be between 8 - 30 characters';
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateLoginInput = (input) => {
  const errors = {};
  const data = input;
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  data.password = String(data.password);

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (!errors.email) {
    if (!Validator.isEmail(data.email)) {
      errors.email = 'Email is invalid';
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export { validateSignupInput, validateLoginInput };
