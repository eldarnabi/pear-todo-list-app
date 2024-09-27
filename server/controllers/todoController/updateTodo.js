// Function to update a task or subtask by its ID using modern JavaScript approaches
import { todoService } from "../../services/index.js";

export const updateTodo = (req, res) => {
    const { readDbFile, saveDbFile } = todoService();

    try {
        const tasks = readDbFile();
        const { id } = req.params;
        const updatedFields = req.body;

        const findAndUpdate = (taskList, targetId, fields) => {
            return taskList.some(task => {
                if (task.id === targetId) {
                    Object.assign(task, fields);
                    return true; // Update successful
                }

                // If the task has subtasks, recurse into them
                if (task.subTasks && task.subTasks.length > 0) {
                    return findAndUpdate(task.subTasks, targetId, fields);
                }

                return false; // Continue searching
            });
        };

        const isUpdated = findAndUpdate(tasks, id, updatedFields);

        if (isUpdated) {
            saveDbFile(tasks);
            return res.status(200).json({ message: 'Task updated successfully.' });
        } else {
            return res.status(404).json({ error: 'Task or subtask not found.' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
