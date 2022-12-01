// config the .env file by importing dotenv package
require("dotenv").config();

// importing app file to setup express
const app = require("./app");

// importing database connection file and invoke them to connect application to database
const databaseConnection = require("./src/configs/database");
databaseConnection();

// import PORT value from .env file
const PORT = process.env.PORT || 80;

// Setting up server to listen at PORT.
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
