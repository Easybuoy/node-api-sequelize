import Validator from "validator";
import isEmpty from "./isEmpty";

const validateSignupInput = (input) => {
  const errors = {};
  const data = input;

  data.fullName = !isEmpty(data.fullName) ? data.fullName : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.userType = !isEmpty(data.userType) ? data.userType : "";
  data.password = String(data.password);

  data.fullName = data.fullName.trim();

  const isNameValid = data.fullName.split(" ").every((word) => {
    if (!word) {
      return true;
    }
    if (Validator.isAlpha(word) === false) {
      return false;
    }
    return true;
  });

  if (isNameValid === false) {
    errors.fullName = "Full name cannot contain number(s)";
  }

  if (!Validator.isLength(data.fullName, { min: 2, max: 40 })) {
    errors.fullName = "Full name must be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.fullName)) {
    errors.fullName = "Full name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!errors.email) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  if (!Validator.isMobilePhone(data.phone, ["en-NG"], { strictMode: true })) {
    errors.phone = "Phone number is not valid";
  }

  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!errors.password) {
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = "Password must be between 8 - 30 characters";
    }
  }

  if (typeof data.userType === "number") {
    data.userType = String(data.userType);
  }

  if (!Validator.isInt(data.userType)) {
    errors.userType = "UserType field must be a number";
  }

  if (Validator.isInt(data.userType)) {
    if (data.userType > 3) {
      errors.userType = "Invalid UserType. UserType cannot be greater than 3";
    }
  }

  if (!data.userType) {
    errors.userType = "UserType field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateLoginInput = (input) => {
  const errors = {};
  const data = input;
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  data.password = String(data.password);

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!errors.email) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validateVerifyPhoneCodeInput = (input) => {
  const errors = {};
  const data = input;
  data.phoneCode = !isEmpty(data.phoneCode) ? data.phoneCode : "";

  if (typeof data.phoneCode === "number") {
    data.phoneCode = String(data.phoneCode);
  }

  if (!Validator.isLength(data.phoneCode, { min: 4, max: 4 })) {
    errors.phoneCode = "Phone code length should be 4 ";
  }

  if (Validator.isEmpty(data.phoneCode)) {
    errors.phoneCode = "Phone code field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validatePasswordResetEmailVerificationInput = (input) => {
  const errors = {};
  const data = input;
  data.email = !isEmpty(data.email) ? data.email : "";

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!errors.email) {
    if (!Validator.isEmail(data.email)) {
      errors.email = "Email is invalid";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const validatePasswordResetInput = (input) => {
  const errors = {};
  const data = input;
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!errors.password) {
    if (!Validator.isLength(data.password, { min: 8, max: 30 })) {
      errors.password = "Password must be between 8 - 30 characters";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export {
  validateSignupInput,
  validateLoginInput,
  validateVerifyPhoneCodeInput,
  validatePasswordResetEmailVerificationInput,
  validatePasswordResetInput,
};
