import { Todo, TodoCreate, TodoUpdate} from '@/types/todo';

// In-memory "database" of todos
const todos: Todo[] = [
  {
    id: '1',
    title: 'Do the groceries',
    description: 'Buy milk, bread, and eggs',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Clean the house',
    description: 'Living room, kitchen, and bathroom',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    title: 'Finish the project',
    description: 'Complete the final report and send it to the team',
    completed: false,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  }
];

// Helper to generate a simple unique ID
function genId(): string {
  return Math.random().toString(36).slice(2,10);
}

// Fetch the list of todos with sorting
export function getTodos(
  sortKey: 'createdAt'|'title' = 'createdAt',
  sortDir: 'asc'|'desc' = 'desc'
): Todo[] {
  const clone = [...todos];

  clone.sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];
    if (aValue < bValue) return sortDir === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  return clone;
}

// Fetch a single todo by ID
export function getTodo(id: string): Todo | null {
  return todos.find(t => t.id === id) || null;
}

// Create a new todo
export function createTodo(input: TodoCreate): Todo {
  const title = input.title.trim();
  const description = (input.description ?? '').trim();
  const completed = Boolean(input.completed ?? false);
  const createdAt = new Date().toISOString();

  const newTodo: Todo = {
    id: genId(),
    title,
    description,
    completed,
    createdAt
  };

  todos.unshift(newTodo);

  return { ...newTodo } as Todo;
}

// Update an existing todo
export function updateTodo(id: string, patch: TodoUpdate): Todo | null {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return null;
  }

  const current = todos[index];
  const updated = {
    ...current,
    ...patch,
    title: (patch.title ?? current.title).trim(),
    description: (patch.description ?? current.description ?? '').trim()
  };
  todos[index] = updated;

  return { ...updated } as Todo;
}

// Delete a todo by ID
export function deleteTodo(id: string): boolean {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return false;
  }

  todos.splice(index, 1);
  return true;
}
