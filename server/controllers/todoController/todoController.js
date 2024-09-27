import { addTodo } from "./addTodo.js";
import { getTodo } from "./getTodo.js";
import { addSubTodo } from "./addSubTodo.js";
import { updateTodo } from "./updateTodo.js";
import { deleteTodo } from "./deleteTodo.js";

export const todoController = () => ({
  addTodo,
  getTodo,
  addSubTodo,
  updateTodo,
  deleteTodo,
});