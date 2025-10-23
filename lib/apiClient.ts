import { SortDir, SortKey, Todo, TodoCreate, TodoUpdate } from '@/types/todo'

const BASE = '/api/todos'

export async function fetchTodos(sortKey: SortKey, sortDir: SortDir): Promise<Todo[]> {
  const ret = await fetch(
    `${BASE}?sortKey=${sortKey}&sortDir=${sortDir}`
  );
  if (!ret.ok)
    throw new Error('Failed to fetch todos');

  return (await ret.json()).data;
}

export async function createTodoApi(input: TodoCreate): Promise<Todo> {
  const ret = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  if (!ret.ok)
    throw new Error('Failed to create todo');

  return (await ret.json()).data;
}

export async function updateTodoApi(id: string, patch: TodoUpdate) {
  const ret = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!ret.ok)
    throw new Error('Update failed');

  return (await ret.json()).data;
}
