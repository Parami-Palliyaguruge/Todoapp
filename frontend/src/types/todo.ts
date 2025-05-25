export interface Todo {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export type TodoStatus = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: TodoStatus;
}

export interface AddTodoPayload {
  title: string;
  description: string;
}

export interface UpdateTodoPayload {
  title?: string;
  description?: string;
  isCompleted?: boolean;
} 