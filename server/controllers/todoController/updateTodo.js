import { todoService } from "../../services/index.js";

export const updateTodo = (req, res) => {
  const { readDbFile, saveDbFile } = todoService();

  try {
    const todos = readDbFile();
    const { id } = req.params;
    const updatedFields = req.body;

    const findAndUpdate = (todosList, targetId, fields) => {
      return todosList.some((todo) => {
        if (todo.id === targetId) {
          Object.assign(todo, fields);
          return true;
        }

        if (todo.subtodo && todo.subtodo.length > 0) {
          return findAndUpdate(todo.subtodo, targetId, fields);
        }

        return false;
      });
    };

    const isUpdated = findAndUpdate(todos, id, updatedFields);

    if (isUpdated) {
      saveDbFile(todos);
      return res.status(200).json({ message: "Task updated successfully." });
    } else {
      return res.status(404).json({ error: "Task or subtask not found." });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};