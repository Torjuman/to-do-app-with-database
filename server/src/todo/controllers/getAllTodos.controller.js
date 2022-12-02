// Importing Todo model package for CRUD operation
const Todo = require("../models/todo.model");

const getAllTodos = function getAllTodos(req, res) {
  Todo.find()
    .then((allTodos) => {
      res.json({ success: true, message: "All todos have found", allTodos });
    })
    .catch((e) => {
      console.log("Error occurred in getAllTodos controller");
      console.log(e);
      res.json({ success: false, message: "All todos have not found" });
    });
};

// exporting the getAllTodos controller
module.exports = getAllTodos;
