// Importing Todo model package for CRUD operation
const Todo = require("../models/todo.model");

// Importing express-validator to extrect error messages
const { validationResult } = require("express-validator");

const createTodo = function createTodo(req, res) {
  try {
    // Destructuring the inputs received from req.body
    let { title, task, isImportant } = req.body;

    // Format the validation error as an message object
    const errors = validationResult(req);
    const errorsMsg = errors.formatWith((err) => err.msg).mapped();

    if (errorsMsg.title) {
      throw new Error(errorsMsg.title);
    }

    if (task && errorsMsg.task) {
      throw new Error(errorsMsg.task);
    }

    if (isImportant && errorsMsg.isImportant) {
      throw new Error(errorsMsg.isImportant);
    }

    let todo = new Todo({ title, task, isImportant });
    todo
      .save()
      .then((newTodo) => {
        console.log("Todo saved successfully");
        console.log(newTodo);
        res.json({
          success: true,
          message: "Todo saved successfully",
          newTodo,
        });
      })
      .catch((e) => {
        console.log("Error occurred at the of saving todo controller");
        console.log(e);
        res.json({
          success: false,
          errorsMsg,
        });
      });
  } catch (error) {
    console.log("Error occurred at the of saving todo controller");
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// exporting the createTodo controller
module.exports = createTodo;
