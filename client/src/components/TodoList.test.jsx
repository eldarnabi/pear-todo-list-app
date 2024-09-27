import { render, screen } from "@testing-library/react";
import { vi, describe, test, expect } from "vitest";
import { TodoList } from "./TodoList";

vi.mock("./TodoItem.jsx", () => ({
  TodoItem: ({ todo }) => <div data-testid="todo-item">{todo.taskName}</div>,
}));

describe("TodoList Component", () => {
  test("renders a list of TodoItem components", () => {
    const mockTodos = [
      {
        id: "1",
        taskName: "Task 1",
        taskStatus: "",
        priority: "",
        subTasks: [],
      },
      {
        id: "2",
        taskName: "Task 2",
        taskStatus: "",
        priority: "",
        subTasks: [],
      },
    ];
    const setTodos = vi.fn();

    render(<TodoList todos={mockTodos} setTodos={setTodos} />);

    const todoItems = screen.getAllByTestId("todo-item");
    expect(todoItems).toHaveLength(2);
    expect(todoItems[0]).toHaveTextContent("Task 1");
    expect(todoItems[1]).toHaveTextContent("Task 2");
  });
});