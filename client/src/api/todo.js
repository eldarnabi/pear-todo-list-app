import api from "./index";

export const fetchTodos = (signal) => api.get("/todo/", { signal });

export const addTodo = (todo) => api.post("/todo/", todo);

export const updateTodo = (id, updatedTodo) =>
  api.patch(`/todo/${id}`, updatedTodo);

export const addSubTask = (parentId, subTask) =>
  api.post(`/todo/${parentId}`, subTask);

export const deleteTodo = (id) => api.delete(`/todo/${id}`);
