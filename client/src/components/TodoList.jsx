import React from 'react';
import TodoItem from './TodoItem.jsx';

function TodoList({ todos, setTodos }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
      ))}
    </div>
  );
}

export default TodoList;
