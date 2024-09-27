import { useState, useEffect } from "react";
import { addTodo } from "../api/todo";
import { FaPlus } from "react-icons/fa";

export const TodoForm = ({ setTodos }) => {
  const [taskName, setTaskName] = useState("");
  const [error, setError] = useState(null);

  const handleAddTodo = async (e) => {
    e.preventDefault();
    const newTodo = {
      taskName: taskName,
    };

    try {
      const createdTodo = await addTodo(newTodo);
      setTodos((prevTodos) => {
        setTaskName("");
        setError(null);
        return [createdTodo.data, ...prevTodos];
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "An error occurred while adding the todo.";
      setError(errorMessage);
    }
  };

  const handleChange = (e) => {
    setTaskName(e.target.value);
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
          onChange={handleChange}
          placeholder="Add new todo"
          required
        />
        <button type="submit" role="button" aria-label="add todo">
          <FaPlus />
        </button>
      </div>
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
    </form>
  );
};