import React from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import TodoList from './TodoList';

// Mock the TodoItem component
vi.mock('./TodoItem.jsx', () => ({
  default: ({ todo }) => (
    <div data-testid="todo-item">
      {todo.taskName}
    </div>
  ),
}));

describe('TodoList Component', () => {
  test('renders a list of TodoItem components', () => {
    // Arrange
    const mockTodos = [
      { id: '1', taskName: 'Task 1', taskStatus: '', priority: '', subTasks: [] },
      { id: '2', taskName: 'Task 2', taskStatus: '', priority: '', subTasks: [] },
    ];
    const setTodos = vi.fn();

    // Act
    render(<TodoList todos={mockTodos} setTodos={setTodos} />);

    // Assert
    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems).toHaveLength(2);
    expect(todoItems[0]).toHaveTextContent('Task 1');
    expect(todoItems[1]).toHaveTextContent('Task 2');
  });
});
