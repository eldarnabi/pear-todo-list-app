import { todoService } from "../../services/index.js";
// This controller should only have one responsibility, which is to add a subtask to a todo item without doing the databasa operations, due to time constraints, i will not refactor this controller at the moment but i will refactor it in the future
export const addSubTodo = (req, res) => {
  const { readDbFile, saveDbFile } = todoService();
  try {
    const todos = readDbFile();
    const { id } = req.params;

    const todo = todos.find((todo) => todo.id === id);
    if (!todo) {
      return res.status(404).json({ error: "Task not found" });
    }

    todos.subTasks.unshift({ ...req.body });
    saveDbFile(todos);
    return res.status(201).json({ message: "Subtask added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};