// Importing Todo model package for CRUD operation
const Todo = require("../models/todo.model");

// Importing express-validator to extrect error messages
const { validationResult } = require("express-validator");

const updateTodo = function updateTodo(req, res) {
  try {
    // Destructuring the inputs received from req.body
    let { title, task, isImportant } = req.body;

    // Destructuring the Id received from req.params and checking the value
    let { todoId } = req.params;

    // Format the validation error as an message object
    const errors = validationResult(req);
    const errorsMsg = errors.formatWith((err) => err.msg).mapped();

    if (!todoId) {
      throw new Error("Todo ID is required to fetch the todo");
    }

    if (typeof todoId !== "string") {
      throw new Error("Todo Id should be type of string");
    }

    if (errorsMsg.title) {
      throw new Error(errorsMsg.title);
    }

    if (task && errorsMsg.task) {
      throw new Error(errorsMsg.task);
    }

    if (isImportant && errorsMsg.isImportant) {
      throw new Error(errorsMsg.isImportant);
    }

    Todo.findOneAndUpdate(
      { _id: todoId },
      { $set: { title, task, isImportant } },
      { new: true }
    )
      .then((updatedTodo) => {
        console.log("Todo updated successfully");
        console.log(updatedTodo);
        res.json({
          success: true,
          message: "Todo updated successfully",
          updatedTodo,
        });
      })
      .catch((e) => {
        console.log("Error occurred at the of updating todo controller");
        console.log(e);
        res.json({
          success: false,
          message: e.message,
        });
      });
  } catch (error) {
    console.log("Error occurred at the of updating todo controller");
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// exporting the update todo controller
module.exports = updateTodo;
