import jwt from "jsonwebtoken";
import configVariables from "../config";

export const generateToken = (payload) =>
  jwt.sign(payload, configVariables.JWT_SECRET, { expiresIn: "1d" });

export const verifyToken = (payload) =>
  jwt.verify(payload, configVariables.JWT_SECRET);
