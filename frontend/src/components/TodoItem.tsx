import React, { useState } from 'react';
import { Todo } from '../types/todo';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { updateTodo, deleteTodo } from '../store/todoSlice';
import { PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleToggle = () => {
    dispatch(updateTodo({
      id: todo.id,
      todo: {
        isCompleted: !todo.isCompleted
      }
    }));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    dispatch(updateTodo({
      id: todo.id,
      todo: {
        title: editTitle,
        description: editDescription
      }
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-4">
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Todo title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Todo description"
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              <CheckIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleCancel}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={handleToggle}
                className="h-4 w-4 text-blue-600"
              />
              <h3 className={`text-lg font-medium ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}>
                {todo.title}
              </h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleEdit}
                className="p-1 text-gray-500 hover:text-blue-500"
              >
                <PencilIcon className="h-5 w-5" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-500 hover:text-red-500"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <p className={`mt-2 text-gray-600 ${todo.isCompleted ? 'line-through text-gray-400' : ''}`}>
            {todo.description}
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Created: {new Date(todo.createdAt).toLocaleDateString()}
          </div>
        </div>
      )}
    </div>
  );
}; 