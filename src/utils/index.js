import jwt from "jsonwebtoken";
import configVariables from "../config";

export const generatePhoneAuthCode = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const generateToken = (payload) =>
  jwt.sign(payload, configVariables.JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (payload) =>
  jwt.verify(payload, configVariables.JWT_SECRET);
