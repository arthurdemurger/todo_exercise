import { createTodo, getTodos } from '@/lib/db';
import type { SortKey, SortDir, TodoCreate } from '@/types/todo';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/todos
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const sortKey: SortKey = searchParams.get('sortKey') === 'title' ? 'title' : 'createdAt';
    const sortDir: SortDir = searchParams.get('sortDir') === 'asc' ? 'asc' : 'desc';

    const data = getTodos(sortKey, sortDir);

    return NextResponse.json({ data }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/todos
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (typeof body.title !== 'string' || body.title.trim() === '') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const newTodo: TodoCreate = {
      title: body.title,
      description: typeof body.description === 'string' ? body.description : undefined,
      completed: Boolean(body.completed ?? false)
    };

    const created = createTodo(newTodo);

    return NextResponse.json({ data: created }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
