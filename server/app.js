const express = require("express");
const morgan = require("morgan");
const todoRouter = require("./src/todo/routes/todo.route");
const app = express();

const versionNum = 1;

// make a middleware array for all
const middlewareArray = [
  morgan("dev"),
  express.json(),
  express.urlencoded({ extended: true }),
];

app.use(middlewareArray);

// make a router array for all paths
const routerArray = [todoRouter];

app.use(`/api/v${versionNum}`, routerArray);

app.get("/", (req, res) => {
  res.status(200).send("<h1>Hello world !</h1>");
});

module.exports = app;
