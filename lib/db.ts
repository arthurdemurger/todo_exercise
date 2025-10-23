// /lib/db.ts
import { Todo, TodoCreate, TodoUpdate} from '@/types/todo';

const todos: Todo[] = [
  {
    id: '1',
    title: 'Do the groceries',
    description: 'Buy milk, bread, and eggs',
    completed: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Clean the house',
    description: 'Living room, kitchen, and bathroom',
    completed: true,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Finish the project',
    description: 'Complete the final report and send it to the team',
    completed: false,
    createdAt: new Date().toISOString()
  }
];

function genId(): string {
  return Math.random().toString(36).slice(2,10);
}

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


export function getTodo(id: string): Todo | null {
  return todos.find(t => t.id === id) || null;
}

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

export function deleteTodo(id: string): boolean {
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) {
    return false;
  }

  todos.splice(index, 1);
  return true;
}
