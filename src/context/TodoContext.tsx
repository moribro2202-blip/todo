import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Todo, Priority, FilterStatus } from '../types/todo';

interface TodoContextType {
  todos: Todo[];
  filter: FilterStatus;
  addTodo: (title: string, priority: Priority, dueDate?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  updateTodo: (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  setFilter: (filter: FilterStatus) => void;
  clearCompleted: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = 'todos-app-data';

function loadTodos(): Todo[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
}

function saveTodos(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

export function TodoProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<FilterStatus>('all');

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (title: string, priority: Priority, dueDate?: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      dueDate,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: string, updates: Partial<Omit<Todo, 'id' | 'createdAt'>>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        setFilter,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within a TodoProvider');
  }
  return context;
}
