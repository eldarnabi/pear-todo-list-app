import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList.jsx';
import AddTodoForm from './components/AddTodoForm.jsx';
import { fetchTodos } from './api/todo';
import './styles/App.scss';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    fetchTodos(signal)
      .then((response) => setTodos(response.data))
      .catch((error) => {
          console.error('Fetch todos error:', error);
      });
    return () => {
      controller.abort();
    };
  }, []);

  // Function to sort todos based on priority and taskStatus (both are date-time strings)
  const sortTodos = (todos) => {
    console.log(todos);
    return [...todos].sort((a, b) => {
      if (a.priority && b.priority) {
        return new Date(b.priority) - new Date(a.priority);
      }

      if (a.priority) return -1;
      if (b.priority) return 1;
      if (a.taskStatus && b.taskStatus) {
        return new Date(b.taskStatus) - new Date(a.taskStatus);
      }
      return 0;
    });
  };

  return (
    <div className="App">
      <h1>PEAR Health Labs</h1>
      <AddTodoForm setTodos={setTodos} />
      <TodoList todos={sortTodos(todos)} setTodos={setTodos} />
    </div>
  );
}

export default App;
