'use client'
import { useState } from 'react';
import { useTodos } from '@/lib/queries';
import type { SortDir, SortKey } from '@/types/todo';
import Link from 'next/link';
import TodoCard from '@/components/ToDoCard';

export default function Home() {
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const { data, isLoading, isError } = useTodos(sortKey, sortDir)

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Todos</h1>

        <div className="ml-auto flex items-center gap-3">
          <select value={sortKey} onChange={e=>setSortKey(e.target.value as SortKey)} className="border px-2 py-1 rounded">
            <option value="createdAt">Created</option>
            <option value="title">Title</option>
          </select>
          <select value={sortDir} onChange={e=>setSortDir(e.target.value as SortDir)} className="border px-2 py-1 rounded">
            <option value="desc">Desc</option>
            <option value="asc">Asc</option>
          </select>
          <Link href="/new" className="button-like">New</Link>
        </div>
      </header>

      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load todos.</p>}

      <ul className="grid gap-3">
        {data?.map(t => (
          // use the unified TodoCard component for each item
          <TodoCard key={t.id} todo={t} />
        ))}
      </ul>
    </div>
  )
}
