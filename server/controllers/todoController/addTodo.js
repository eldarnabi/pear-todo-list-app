import { todoService } from "../../services/index.js";

export const addTodo = (req, res) => {
  const { insertOne } = todoService();
  const data = req.body;

  try {
    const newDoto = insertOne(data);
    return res.status(201).json(newDoto);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};