// Importing Todo model package for CRUD operation
const Todo = require("../models/todo.model");

const deleteTodo = function deleteTodo(req, res) {
  try {
    // Destructuring the Id received from req.params and checking the value
    let { todoId } = req.params;

    if (!todoId) {
      throw new Error("Todo ID is required to fetch the todo");
    }

    if (typeof todoId !== "string") {
      throw new Error("Todo Id should be type of string");
    }

    Todo.findOneAndDelete({ _id: todoId })
      .then((deletedTodo) => {
        res.json({ success: true, message: "Todo has deleted", deletedTodo });
      })
      .catch((e) => {
        console.log("Error occurred in deleteTodo controller");
        console.log(e);
        res.json({
          success: false,
          message: "Something went wrong. Todo has not deleted",
        });
      });
  } catch (error) {
    console.log("Error occurred in deleteTodo controller");
    console.log(error);
    res.json({
      success: false,
      message: "Something went wrong. Todo has not deleted",
    });
  }
};

// exporting the deleteTodo controller
module.exports = deleteTodo;
