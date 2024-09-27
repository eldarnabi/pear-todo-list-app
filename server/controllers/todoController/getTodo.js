// Initiates the process of reading the tasks from the database file and returns the tasks to the client.
import { todoService } from "../../services/index.js";
export const getTodo = (req, res) => {
    const { readDbFile, saveDbFile } = todoService();
    try {
        const tasks = readDbFile();
        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};