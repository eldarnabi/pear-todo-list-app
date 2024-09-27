import api from './index';

// Fetch all todos
export const fetchTodos = (signal) => api.get('/todo/', { signal });

// Add a new todo
export const addTodo = (todo) => api.post('/todo/', todo);

// Update an existing todo
export const updateTodo = (id, updatedTodo) =>
  api.patch(`/todo/${id}`, updatedTodo);

// Add a new sub-task to a parent todo
export const addSubTask = (parentId, subTask) =>
  api.post(`/todo/${parentId}`, subTask);

// Delete a todo
export const deleteTodo = (id) => api.delete(`/todo/${id}`);
