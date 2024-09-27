import { todoService } from "../../services/index.js";

export const getTodo = (_req, res) => {
  const { readDbFile } = todoService();
  try {
    const todos = readDbFile();
    return res.status(200).json(todos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};