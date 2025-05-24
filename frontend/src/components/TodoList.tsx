import React, { useEffect } from 'react';
import { TodoItem } from './TodoItem';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchTodos } from '../store/todoSlice';
import { RootState } from '../store/store';
import { Todo } from '../types/todo';

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { todos, status, error, filter } = useAppSelector((state: RootState) => state.todos);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTodos());
    }
  }, [dispatch, status]);

  const filteredTodos = todos.filter((todo: Todo) => {
    switch (filter) {
      case 'active':
        return !todo.isCompleted;
      case 'completed':
        return todo.isCompleted;
      default:
        return true;
    }
  });

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No todos found. Add some tasks to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {filteredTodos.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}; 