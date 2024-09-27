// Function to add subtask to a task by its id if it exists
import { todoService } from "../../services/index.js";
export const addSubTodo = (req, res) => {
    const { readDbFile, saveDbFile } = todoService();
    try {
        const tasks = readDbFile();
        const { id } = req.params;
        
        const task = tasks.find((task) => task.id === id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        console.log(req.body);
        task.subTasks.unshift({ ...req.body });
        saveDbFile(tasks);
        return res.status(201).json({ message: 'Subtask added successfully' });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};