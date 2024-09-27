import { v4 as uuidv4 } from "uuid";

export const Todo = (data) => Object.freeze({
    id : uuidv4(),
    taskName: data.taskName,
    taskStatus: "",
    priority: "",
    subTasks: [],
});