export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  dueDate?: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
