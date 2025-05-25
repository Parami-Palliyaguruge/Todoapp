import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TodoState, AddTodoPayload, UpdateTodoPayload, TodoStatus } from '../types/todo';
import { todoApi } from '../services/api';

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  error: null,
  filter: 'all',
};

// Async thunks
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async () => {
    return await todoApi.getAll();
  }
);

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (todo: AddTodoPayload) => {
    return await todoApi.create(todo);
  }
);

export const updateTodo = createAsyncThunk(
  'todos/updateTodo',
  async ({ id, todo }: { id: string; todo: UpdateTodoPayload }) => {
    return await todoApi.update(id, todo);
  }
);

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: string) => {
    await todoApi.delete(id);
    return id;
  }
);

export const fetchTodosByStatus = createAsyncThunk(
  'todos/fetchTodosByStatus',
  async (isCompleted: boolean) => {
    return await todoApi.getByStatus(isCompleted);
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<TodoStatus>) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      // Add todo
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      // Update todo
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.todos.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      // Delete todo
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      // Fetch todos by status
      .addCase(fetchTodosByStatus.fulfilled, (state, action) => {
        state.todos = action.payload;
      });
  },
});

export const { setFilter } = todoSlice.actions;

export default todoSlice.reducer; 