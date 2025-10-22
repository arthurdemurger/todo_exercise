'use client'
import { useState } from 'react';
import { useTodos } from '@/lib/queries';
import type { SortDir, SortKey } from '@/types/todo';
import Link from 'next/link';

export default function Home() {
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDir, setSortDir] = useState<SortDir>('desc')
  const { data, isLoading, isError } = useTodos(sortKey, sortDir)

  return (
    <div className="space-y-4">
      <header className="flex items-center gap-2">
        <select value={sortKey} onChange={e=>setSortKey(e.target.value as SortKey)} className="border px-2 py-1 rounded">
          <option value="createdAt">Created</option>
          <option value="title">Title</option>
        </select>
        <select value={sortDir} onChange={e=>setSortDir(e.target.value as SortDir)} className="border px-2 py-1 rounded">
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
        <Link href="/new" className="ml-auto underline">New</Link>
      </header>

      {isLoading && <p>Loading…</p>}
      {isError && <p>Failed to load todos.</p>}

      <ul className="space-y-2">
        {data?.map(t => (
          <li key={t.id} className="rounded border p-3 bg-white flex items-center justify-between">
            <div>
              <div className={t.completed ? 'line-through text-gray-400' : ''}>{t.title}</div>
              <div className="text-xs text-gray-500">{new Date(t.createdAt).toLocaleString()}</div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded ${t.completed ? 'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>
              {t.completed ? 'Completed' : 'Incomplete'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
