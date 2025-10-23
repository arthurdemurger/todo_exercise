'use client'
import { FormEvent, useState } from 'react'
import { useCreateTodo } from '@/lib/queries'
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';

export default function NewTodoPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const router = useRouter();
  const { mutate, isPending, isError, error } = useCreateTodo();

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    mutate(
      { title, description: description || undefined, completed },
      { onSuccess: () => {
        toast.success('Todo created successfully');
        router.push('/');
      }}
    )
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-semibold">Create a Todo</h1>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm">Title *</label>
          <input
            className="w-full rounded border px-3 py-2"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ex: Buy milk"
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Description</label>
          <textarea
            className="w-full rounded border px-3 py-2"
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Optional details"
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={completed}
            onChange={e => setCompleted(e.target.checked)}
          />
          Completed
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="btn btn-primary"
          >
            {isPending ? 'Saving…' : 'Save'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/')}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>

        {isError && (
          <p className="text-sm text-red-600">
            {(error as Error)?.message || 'Failed to create'}
          </p>
        )}
      </form>
    </div>
  )
}