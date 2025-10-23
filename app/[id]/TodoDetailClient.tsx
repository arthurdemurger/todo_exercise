'use client'

import { useEffect, useMemo, useState, FormEvent, startTransition, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useTodo, useUpdateTodo, useDeleteTodo } from '@/lib/queries' // ← assure-toi d'avoir ces hooks
import type { TodoUpdate } from '@/types/todo'
import { toast } from 'react-toastify'

export default function TodoDetailPage({ id }: { id: string }) {
  const router = useRouter();

  const { data: todo, isLoading, isError } = useTodo(id)

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (todo) {
      startTransition(() => {
        setTitle(todo.title ?? '');
        setDescription(todo.description ?? '');
        setCompleted(Boolean(todo.completed));
      })
    }
  }, [todo]);

  const { mutate: update, isPending: isSaving } = useUpdateTodo(id);
  const { mutate: remove, isPending: isDeleting } = useDeleteTodo(id);

  const patch: TodoUpdate = useMemo(() => {
    if (!todo) return {};
    const p: TodoUpdate = {}
    if (title !== todo.title) p.title = title
    if ((description || '') !== (todo.description || '')) p.description = description
    if (completed !== todo.completed) p.completed = completed
    return p
  }, [todo, title, description, completed]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!todo) return;
    if (Object.keys(patch).length === 0) {
      return;
    }

    update(patch, { onSuccess: () => toast.success('Todo updated successfully') });
  }

  function onDelete() {
    if (!todo) return
    if (confirm('Are you sure you want to delete this todo?')) {
      remove(undefined, { onSuccess: () => {
        router.push('/');
        toast.success('Todo deleted successfully');
      }});
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl p-6 space-y-4">
        <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-24 w-full animate-pulse rounded bg-gray-200" />
      </div>
    )
  }

  if (isError || !todo) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <p className="mb-4 text-red-600">Impossible to load this TODO.</p>
        <Link href="/" className="underline">← Back to list</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Todo details</h1>
        <Link href="/" className="text-sm underline">← Back to list</Link>
      </div>

      <div className="text-xs text-gray-500">
        Créé le {new Date(todo.createdAt).toLocaleString()}
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">Title *</label>
          <input
            className="w-full rounded border px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title of the TODO"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Description</label>
          <textarea
            className="w-full rounded border px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Détails optionnels"
            rows={4}
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
          />
          Completed
        </label>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={isSaving || Object.keys(patch).length === 0}
            className="btn btn-primary"
          >
            {isSaving ? 'Saving…' : 'Save'}
          </button>

          <button
            type="button"
            onClick={onDelete}
            disabled={isDeleting}
            className="btn btn-delete"
          >
            {isDeleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </form>
    </div>
  )
}
