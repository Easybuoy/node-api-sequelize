import app from "./app";

process.on("uncaughtException", (err) => {
  console.error(`${new Date().toUTCString()} uncaughtException:`, err);
  process.exit(0);
});
process.on("SIGINT", (err) => {
  console.error(`${new Date().toUTCString()} SIGINT:`, err);
  process.exit(0);
});
process.on("SIGTERM", (err) => {
  console.error(`${new Date().toUTCString()} SIGTERM:`, err);
  process.exit(0);
});

process.on("ELIFECYCLE", (err) => {
  console.error(`${new Date().toUTCString()} ELIFECYCLE:`, err);
  process.exit(0);
});
process.on("unhandledRejection", (err) => {
  console.error(`${new Date().toUTCString()} unhandledRejection:`, err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
