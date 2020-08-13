import dotenv from "dotenv";

dotenv.config();

const {
  DATABASE_URL,
  SALT_ROUNDS,
  JWT_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
} = process.env;

const configVariables = {
  DATABASE_URL,
  SALT_ROUNDS,
  JWT_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_PHONE_NUMBER,
};

export default configVariables;
