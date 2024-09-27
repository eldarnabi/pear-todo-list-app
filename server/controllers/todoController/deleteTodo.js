import { todoService } from "../../services/index.js";

export const deleteTodo = (req, res) => {
  const { deleteOne } = todoService();
  const { id } = req.params;

  try {
    deleteOne(id);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};