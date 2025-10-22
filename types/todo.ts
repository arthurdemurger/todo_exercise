// Types for ToDo items
export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO date string
}

// DTOs for creating a ToDo
export interface TodoCreate {
  title: string;
  description?: string;
  completed?: boolean;
}

export type TodoUpdate = Partial<Omit<Todo, 'id' | 'createdAt'>>;

// Sorting options
export type SortKey = 'createdAt' | 'title';
export type SortDir = 'asc' | 'desc';
