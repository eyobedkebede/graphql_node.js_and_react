require('dotenv').config()
// Start the DB or Connect with the DB file

// Mongoose
const mongoose = require("mongoose");

// Connect with DB
mongoose
  .connect(process.env.DB_URL)
  .then((_) => {
    console.log(`Successfully Connected`);
  })
  .catch((err) => {
    console.log(`Error while connecting to DB`);
    console.log(err);
  });

// DB Connection
const db_conn = mongoose.connection;

// Handle error after connecting
db_conn.on("error", (err) => {
  console.log(`Error while connecting to DB`);
  console.log(err);
});

db_conn.on("disconnected", () => {
  console.log(`DB is disconnected`);
});

// Export DB Connection
module.exports = db_conn;