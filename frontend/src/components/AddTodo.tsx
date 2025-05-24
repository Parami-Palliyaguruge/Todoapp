import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { addTodo } from '../store/todoSlice';
import { PlusIcon } from '@heroicons/react/24/outline';

export const AddTodo: React.FC = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      try {
        setIsLoading(true);
        setError(null);
        await dispatch(addTodo({
          title: title.trim(),
          description: description.trim(),
        })).unwrap();
        setTitle('');
        setDescription('');
        setIsExpanded(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to add todo');
        console.error('Failed to add todo:', err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsExpanded(true)}
              placeholder="What needs to be done?"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          
          {isExpanded && (
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description (optional)"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                disabled={isLoading}
              />
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          {isExpanded && (
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setError(null);
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={!title.trim() || isLoading}
              >
                <PlusIcon className="h-5 w-5 mr-1" />
                {isLoading ? 'Adding...' : 'Add Todo'}
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}; 