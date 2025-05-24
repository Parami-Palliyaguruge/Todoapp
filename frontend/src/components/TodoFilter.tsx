import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setFilter } from '../store/todoSlice';
import type { TodoStatus } from '../types/todo';
import type { RootState } from '../store/store';

const filterOptions: { label: string; value: TodoStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export const TodoFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentFilter = useAppSelector((state: RootState) => state.todos.filter);

  return (
    <div className="flex justify-center space-x-2 mb-6">
      {filterOptions.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => dispatch(setFilter(value))}
          className={`px-4 py-2 rounded ${
            currentFilter === value
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}; 