const app = require("./app");
const connectDb = require("./database/database");
require("dotenv").config();

// Connect to database
connectDb();

// Start the server
const server = app.listen(process.env.PORT, () => {
  console.log(`App running on ${process.env.PORT}`);
});

// Handle unhandled promise rejections
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
