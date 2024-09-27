import { TodoItem } from "./TodoItem.jsx";

export const TodoList = ({ todos, setTodos }) => (
  <div className="todo-list">
    {todos.map((todo) => (
      <TodoItem key={todo.id} todo={todo} setTodos={setTodos} />
    ))}
  </div>
);
