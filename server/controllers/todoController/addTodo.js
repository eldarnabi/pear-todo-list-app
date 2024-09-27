// Initiate a new task and add it to the list
import { todoService } from "../../services/index.js";
export const addTodo = (req, res) => {
    const { insertOne } = todoService();
    const data = req.body;
    try {
        const newData = insertOne(data);
        return res.status(201).json(newData);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
