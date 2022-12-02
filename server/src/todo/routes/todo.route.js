// import router package from express
const router = require("express").Router();

// DeDestructuring body from express-validator
const { body } = require("express-validator");

// import all todo controllers from controller directory
const createTodoController = require("../controllers/createTodo.controller");
const getAllTodosController = require("../controllers/getAllTodos.controller");
const getSingleTodoController = require("../controllers/getSingleTodo.controller");
const updateTodoController = require("../controllers/updateTodo.controller");
const deleteTodoController = require("../controllers/deleteTodo.controller");

// Store prime path in a variable
const todoStr = "/todo";

// Validate Title, Task and isImportant and store this in an array
const validatorArray = [
  body("title")
    .notEmpty()
    .withMessage("Title can't be empty")
    .isString()
    .withMessage("Title must be in string format")
    .isLength({ max: 50 })
    .withMessage("Title length must be within 50 charecters")
    .trim(),
  body("task").isArray().withMessage("Task must be in array format"),
  body("isImportant")
    .isBoolean()
    .withMessage("isImportant must be in boolean format"),
];

// register all todo paths and mehtods with controller

// Create new todo
router.post(`${todoStr}/createtodo`, validatorArray, createTodoController);

// Get all existing todos
router.get(`${todoStr}/getalltodos`, getAllTodosController);

// Update, delete and get single todo with the help of Id
router
  .route(`${todoStr}/:todoId`)
  .get(getSingleTodoController)
  .put(validatorArray, updateTodoController)
  .delete(deleteTodoController);

// Exporting the router module
module.exports = router;
