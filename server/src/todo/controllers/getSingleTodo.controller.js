// Importing Todo model package for CRUD operation
const Todo = require("../models/todo.model");

const getSingleTodo = function getSingleTodo(req, res) {
  try {
    // Destructuring the Id received from req.params and checking the value
    let { todoId } = req.params;

    if (!todoId) {
      throw new Error("Todo ID is required to fetch the todo");
    }

    if (typeof todoId !== "string") {
      throw new Error("Todo Id should be type of string");
    }

    Todo.findById(todoId)
      .then((singleTodo) => {
        res.json({
          success: true,
          message: "Single todo has found",
          singleTodo,
        });
      })
      .catch((e) => {
        console.log("Error occurred in getSingleTodo controller");
        console.log(e);
        res.json({
          success: false,
          message: e.message,
        });
      });
  } catch (error) {
    console.log("Error occurred in getSingleTodo controller");
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// exporting the single todo controller
module.exports = getSingleTodo;
