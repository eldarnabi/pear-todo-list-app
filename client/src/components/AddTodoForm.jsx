// src/components/AddTodoForm.jsx
import React, { useState, useEffect } from 'react';
import { addTodo } from '../api/todo';
import {FaPlus } from 'react-icons/fa';

function AddTodoForm({ setTodos }) {
  const [taskName, setTaskName] = useState('');
  const [error, setError] = useState(null);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const newTodo = {
      taskName: taskName,
    };

    try {
      const createdTodo = await addTodo(newTodo); // Await the created todo from the backend
      setTodos((prevTodos) => [createdTodo.data, ...prevTodos]); // Use the complete todo object
      setTaskName('');
      setError(null); // Clear any previous error
    } catch (error) {
      // Enhanced error handling
      const errorMessage =
        error.response?.data?.error || 'An error occurred while adding the todo.';
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000); // Increased to 3 seconds for better UX
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <form onSubmit={handleAddTodo}>
      <div className="form-row">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add new todo"
          required
        />
        <button type="submit"><FaPlus /></button>
      </div>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default AddTodoForm;
