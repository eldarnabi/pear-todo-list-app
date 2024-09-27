import { useState } from "react";
import { updateTodo, addSubTask, deleteTodo } from "../api/todo";
import { v4 as uuidv4 } from "uuid";
import {
  FaStar,
  FaRegStar,
  FaChevronDown,
  FaChevronUp,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

const updateTodoInArray = (todos, updatedTodo) =>
  todos.map((todo) => {
    if (todo.id === updatedTodo.id) return updatedTodo;
    if (todo.subTasks && todo.subTasks.length > 0) {
      return {
        ...todo,
        subTasks: updateTodoInArray(todo.subTasks, updatedTodo),
      };
    }
    return todo;
  });

const removeTodoFromArray = (todos, idToRemove) =>
  todos
    .filter((todo) => todo.id !== idToRemove)
    .map((todo) => ({
      ...todo,
      subTasks: todo.subTasks
        ? removeTodoFromArray(todo.subTasks, idToRemove)
        : [],
    }));

export const TodoItem = ({ todo, setTodos, parentTodo = null }) => {
  const [showSubTasks, setShowSubTasks] = useState(false);
  const [newSubTaskName, setNewSubTaskName] = useState("");

  const handleUpdate = (updatedTodo) => {
    setTodos((prev) => updateTodoInArray(prev, updatedTodo));
  };

  const handleRemove = (id) => {
    setTodos((prev) => removeTodoFromArray(prev, id));
  };

  const toggleComplete = () => {
    const updatedStatus = todo.taskStatus ? "" : new Date().toISOString();
    let updatedTodo;

    if (parentTodo) {
      const updatedSubTasks = parentTodo.subTasks.map((sub) =>
        sub.id === todo.id ? { ...sub, taskStatus: updatedStatus } : sub
      );
      const allCompleted = updatedSubTasks.every((sub) => sub.taskStatus);
      updatedTodo = {
        ...parentTodo,
        taskStatus: allCompleted ? new Date().toISOString() : "",
        subTasks: updatedSubTasks,
      };
    } else {
      updatedTodo = { ...todo, taskStatus: updatedStatus };
    }

    updateTodo(updatedTodo.id, updatedTodo)
      .then(() => handleUpdate(updatedTodo))
      .catch(console.error);
  };

  const togglePriority = () => {
    if (parentTodo) return;

    const updatedTodo = {
      ...todo,
      priority: todo.priority ? "" : new Date().toISOString(),
    };

    updateTodo(updatedTodo.id, updatedTodo)
      .then(() => handleUpdate(updatedTodo))
      .catch(console.error);
  };

  const handleAddSubTask = (e) => {
    e.preventDefault();
    const newSubTask = {
      id: uuidv4(),
      taskName: newSubTaskName,
      taskStatus: "",
      priority: "",
      subTasks: [],
    };
    const updatedTodo = {
      ...todo,
      subTasks: [...(todo.subTasks || []), newSubTask],
      taskStatus: "",
    };

    addSubTask(todo.id, newSubTask)
      .then(() => {
        handleUpdate(updatedTodo);
        setNewSubTaskName("");
        setShowSubTasks(true);
      })
      .catch(console.error);
  };

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    deleteTodo(todo.id)
      .then(() => handleRemove(todo.id))
      .catch(console.error);
  };

  return (
    <div
      className={`todo-item ${todo.priority ? "priority" : ""} ${
        parentTodo ? "sub-task" : ""
      }`}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          checked={Boolean(todo.taskStatus)}
          onChange={toggleComplete}
        />
        <span className={todo.taskStatus ? "completed" : ""}>
          {todo.taskName}
        </span>

        {!parentTodo && (
          <div className="button-group">
            <button
              onClick={togglePriority}
              className="icon-button"
              aria-label={
                todo.priority ? "Unmark Priority" : "Mark as Priority"
              }
            >
              {todo.priority ? <FaStar /> : <FaRegStar />}
            </button>
            <button
              onClick={() => setShowSubTasks((prev) => !prev)}
              className="icon-button"
              aria-label={showSubTasks ? "Hide Subtasks" : "Show Subtasks"}
            >
              {showSubTasks ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            <button
              onClick={handleDelete}
              className="icon-button delete-button"
              aria-label="Delete Task"
            >
              <FaTrash />
            </button>
          </div>
        )}
      </div>

      {showSubTasks && !parentTodo && (
        <div className="subtasks">
          {todo.subTasks &&
            todo.subTasks.map((subTask) => (
              <TodoItem
                key={subTask.id}
                todo={subTask}
                setTodos={setTodos}
                parentTodo={todo}
              />
            ))}

          <form onSubmit={handleAddSubTask}>
            <input
              type="text"
              value={newSubTaskName}
              onChange={(e) => setNewSubTaskName(e.target.value)}
              placeholder="Add new sub-task"
              required
            />
            <button type="submit">
              <FaPlus />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};