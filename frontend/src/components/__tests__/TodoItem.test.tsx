import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { TodoItem } from '../TodoItem';
import todoReducer from '../../store/todoSlice';

const mockTodo = {
  id: '1',
  title: 'Test Todo',
  description: 'Test Description',
  isCompleted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  userId: 'test-user'
};

const store = configureStore({
  reducer: {
    todos: todoReducer
  }
});

const renderWithRedux = (component: React.ReactElement) => {
  return render(
    <Provider store={store}>
      {component}
    </Provider>
  );
};

describe('TodoItem', () => {
  it('renders todo item correctly', () => {
    renderWithRedux(<TodoItem todo={mockTodo} />);
    
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.description)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('handles toggle completion', () => {
    renderWithRedux(<TodoItem todo={mockTodo} />);
    
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    
    // Since we're using a real store, we can check if the state was updated
    expect(checkbox).toBeChecked();
  });

  it('enters edit mode when edit button is clicked', () => {
    renderWithRedux(<TodoItem todo={mockTodo} />);
    
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    expect(screen.getByDisplayValue(mockTodo.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(mockTodo.description)).toBeInTheDocument();
  });

  it('handles save in edit mode', () => {
    renderWithRedux(<TodoItem todo={mockTodo} />);
    
    // Enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    // Update values
    const titleInput = screen.getByDisplayValue(mockTodo.title);
    const descriptionInput = screen.getByDisplayValue(mockTodo.description);
    
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(descriptionInput, { target: { value: 'Updated Description' } });
    
    // Save changes
    const saveButton = screen.getByRole('button', { name: /save/i });
    fireEvent.click(saveButton);
    
    // Check if we're back to view mode
    expect(screen.queryByDisplayValue('Updated Title')).not.toBeInTheDocument();
    expect(screen.getByText('Updated Title')).toBeInTheDocument();
  });

  it('handles cancel in edit mode', () => {
    renderWithRedux(<TodoItem todo={mockTodo} />);
    
    // Enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    // Update value but then cancel
    const titleInput = screen.getByDisplayValue(mockTodo.title);
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    // Check if we're back to view mode with original values
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
  });

  it('handles delete', () => {
    renderWithRedux(<TodoItem todo={mockTodo} />);
    
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    // Since we're using a real store, the item should be removed
    expect(screen.queryByText(mockTodo.title)).not.toBeInTheDocument();
  });
}); 