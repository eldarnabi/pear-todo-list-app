// src/components/AddTodoForm.test.jsx
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import AddTodoForm from './AddTodoForm';
import { addTodo } from '../api/todo';

// Mock the addTodo function
vi.mock('../api/todo', () => ({
  addTodo: vi.fn(),
}));

test('calls setTodos when the form is submitted', async () => {
  const setTodos = vi.fn();

  // Set up the mock to return a resolved promise
  addTodo.mockResolvedValue();

  const { getByPlaceholderText, getByRole } = render(
    <AddTodoForm setTodos={setTodos} />
  );

  const input = getByPlaceholderText(/add new todo/i);
  const button = getByRole('button', { name: /add todo/i });

  fireEvent.change(input, { target: { value: 'New Task' } });
  fireEvent.click(button);

  // Wait for the asynchronous code to execute
  await waitFor(() => {
    expect(setTodos).toHaveBeenCalledTimes(1);
  });

  expect(setTodos).toHaveBeenCalledWith(expect.any(Function));
});
