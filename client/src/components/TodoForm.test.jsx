import { render, fireEvent, waitFor } from "@testing-library/react";
import { vi, expect, test } from "vitest";
import { TodoForm } from "./TodoForm";
import { addTodo } from "../api/todo";

vi.mock("../api/todo", () => ({
  addTodo: vi.fn(),
}));

test("calls setTodos when the form is submitted", async () => {
  const setTodos = vi.fn();

  addTodo.mockResolvedValue();

  const { getByPlaceholderText, getByRole } = render(
    <TodoForm setTodos={setTodos} />
  );

  const input = getByPlaceholderText(/add new todo/i);
  const button = getByRole("button", { name: /add todo/i });

  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(button);

  await waitFor(() => {
    expect(setTodos).toHaveBeenCalledTimes(1);
  });

  expect(setTodos).toHaveBeenCalledWith(expect.any(Function));
});