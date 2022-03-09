/**
 * Databse Connection Logic
 */
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/node-mongodb", {
  useNewUrlParser: true,
});
const conn = mongoose.connection;
conn.on("connected", () => {
  console.log("Successfully connected to the database");
});
conn.on("disconnected", () => {
  console.log("Successfully disconnected from the database");
});
conn.on("error", () => {
  console.error.bind(console, "Connection Error");
});

module.exports = conn;
