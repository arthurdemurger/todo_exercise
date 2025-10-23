import { NextRequest, NextResponse } from 'next/server'
import { getTodo, updateTodo, deleteTodo } from '@/lib/db'
import type { TodoUpdate } from '@/types/todo'

// GET /api/todos/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const todo = getTodo(id);
    if (!todo) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ data: todo }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/todos/[id]
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    let body: unknown
    const { id } = await params;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const patch: TodoUpdate = {};
    const b = body as Record<string, unknown>;

    if (typeof b.title === 'string')
      patch.title = b.title;
    if (typeof b.description === 'string')
      patch.description = b.description;
    if (typeof b.completed === 'boolean')
      patch.completed = b.completed;

    const updated = updateTodo(id, patch)
    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ data: updated }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/todos/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const ok = deleteTodo(id);
    if (!ok) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
