import React from 'react';
import { useAppSelector } from '../hooks/useAppSelector';
import { ChartBarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';
import { RootState } from '../store/store';
import { Todo } from '../types/todo';
import { Logout } from './Logout';
import { AddTodo } from './AddTodo';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';

export const TodoDashboard: React.FC = () => {
  const todos = useAppSelector((state: RootState) => state.todos.todos);
  
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo: Todo) => todo.isCompleted).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTodos,
      icon: ChartBarIcon,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      label: 'Completed',
      value: completedTodos,
      icon: CheckCircleIcon,
      color: 'bg-green-100 text-green-600',
    },
    {
      label: 'Active',
      value: activeTodos,
      icon: ClockIcon,
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <Logout />
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">{label}</p>
                  <p className="text-2xl font-semibold">{value}</p>
                </div>
                <div className={`p-3 rounded-full ${color}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Completion Rate</span>
            <span className="text-gray-800 font-medium">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>

      <AddTodo />
      <TodoFilter />
      <TodoList />
    </div>
  );
}; 