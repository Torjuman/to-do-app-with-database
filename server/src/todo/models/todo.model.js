// Importing the mongoose package
const mongoose = require("mongoose");

// Destructure Schema and model from mongoose
const { Schema, model } = mongoose;

/**
 * Create a Schema for Todo and the have
 *  - title: its string type, required field and max length upto 50 charecters,
 *  - tasks: it is a collection(Array) of task and type is string,
 *  - isImportant: its boolean type and by default it is false,
 *  - timestamps: it will record creation time
 */
const TodoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required"],
      maxLength: [50, "Title length must be within 50 charecters"],
    },

    task: [
      {
        type: String,
        trim: true,
      },
    ],

    isImportant: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * Todo model
 *  - model is created for todo and exported
 */
const Todo = model("Todo", TodoSchema);
module.exports = Todo;
