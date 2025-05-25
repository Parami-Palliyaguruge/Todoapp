import axios from 'axios';
import { Todo, AddTodoPayload, UpdateTodoPayload } from '../types/todo';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
axiosInstance.interceptors.request.use((config) => {
  // Try to get Auth0 token first
  const auth0Token = localStorage.getItem('auth0_token');
  // Then try mock token
  const mockAuth = localStorage.getItem('mock_auth');
  const mockToken = mockAuth ? JSON.parse(mockAuth).token : null;
  
  const token = auth0Token || mockToken;
  
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'An error occurred while processing your request');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error('Error setting up the request');
    }
  }
);

export const todoApi = {
  getAll: async (): Promise<Todo[]> => {
    const response = await axiosInstance.get<Todo[]>('/todos');
    return response.data;
  },

  getById: async (id: string): Promise<Todo> => {
    const response = await axiosInstance.get<Todo>(`/todos/${id}`);
    return response.data;
  },

  create: async (todo: AddTodoPayload): Promise<Todo> => {
    const response = await axiosInstance.post<Todo>('/todos', todo);
    return response.data;
  },

  update: async (id: string, todo: UpdateTodoPayload): Promise<Todo> => {
    const response = await axiosInstance.put<Todo>(`/todos/${id}`, todo);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/todos/${id}`);
  },

  getByStatus: async (isCompleted: boolean): Promise<Todo[]> => {
    const response = await axiosInstance.get<Todo[]>(`/todos/status/${isCompleted}`);
    return response.data;
  }
}; 