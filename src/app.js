import express from "express";
import cors from "cors";
import helmet from "helmet";
import xss from "xss-clean";

import authRoutes from "./routes/auth";

const app = express();

// Json Body Parser
app.use(express.json({ limit: "10kb" }));

// Cors
app.use(cors());

// Helmet
app.use(helmet());

// Data Sanitization against XSS
app.use(xss());

app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome to ELA API 👋🏾" });
});

app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  const error = new Error("Route Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    status: "error",
    message: error.message,
  });
  next();
});

export default app;
