import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { Todo } from "../../entities/Todo.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, "../../db");
const dbFilePath = `${dbPath}/db.json`;

export const todoService = () => {
  const readDbFile = () => {
    try {
      let todos = fs.readFileSync(dbFilePath, "utf8");
      if (todos === "") {
        todos = "[]";
      }
      return JSON.parse(todos);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const saveDbFile = (data) => {
    try {
      fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 4));
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const insertOne = (data) => {
    try {
      const todos = readDbFile();
      const newTodo = Todo(data);
      const isExist = todos.find((todo) => todo.taskName === newTodo.taskName);

      if (isExist) {
        throw new Error("Task already exist");
      }
      todos.unshift(newTodo);
      saveDbFile(todos);
      return newTodo;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const deleteOne = (id) => {
    try {
      const todos = readDbFile();
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      if (todos.length === filteredTodos.length) {
        throw new Error("Task not found");
      }
      saveDbFile(filteredTodos);
      return filteredTodos;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };
  return {
    readDbFile,
    saveDbFile,
    insertOne,
    deleteOne,
  };
};