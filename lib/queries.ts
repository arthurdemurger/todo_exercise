'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTodos, createTodoApi, updateTodoApi } from './apiClient'
import { SortDir, SortKey, Todo, TodoCreate, TodoUpdate } from '@/types/todo'

// Hook to fetch the list of todos with sorting
export function useTodos(sortKey: SortKey, sortDir: SortDir) {
  return useQuery({
    queryKey: ['todos', sortKey, sortDir],
    queryFn: () => fetchTodos(sortKey, sortDir)
  });
}

// Hook to fetch a single todo by ID
export function useTodo(id: string) {
  return useQuery({
    queryKey: ['todo', id],
    queryFn: async () => {
      const ret = await fetch(`/api/todos/${id}`);
      if (!ret.ok)
        throw new Error('Failed to fetch todo');

      return (await ret.json()).data as Todo;
    }
  });
}

// Hook to create a new todo
export function useCreateTodo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: TodoCreate) => createTodoApi(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  });
}

// Hook to update an existing todo
export function useUpdateTodo(id: string) {
  const qc = useQueryClient();

  return useMutation({

    // Define the mutation function to update a todo
    mutationFn: (patch: TodoUpdate) => updateTodoApi(id, patch),

    // Optimistically update the todo in the cache
    onMutate: async (patch) => {
      await qc.cancelQueries({ queryKey: ['todos'] })

      const prevLists = qc.getQueriesData<Todo[]>({ queryKey: ['todos'] })
      for (const [key, list] of prevLists) {
        if (!list) continue
        const next = list.map(t => (t.id === id ? { ...t, ...patch } : t))
        qc.setQueryData(key, next)
      }

      const prevDetail = qc.getQueryData<Todo>(['todo', id])
      if (prevDetail) qc.setQueryData(['todo', id], { ...prevDetail, ...patch })

      return { prevLists, prevDetail }
    },

    // Rollback on error
    onError: (_err, _patch, ctx) => {
      if (!ctx) return;
      for (const [key, list] of ctx.prevLists ?? []) {
        qc.setQueryData(key, list);
      }
      if (ctx.prevDetail) {
        qc.setQueryData(['todo', id], ctx.prevDetail);
      }
    },

    // Invalidate queries to refetch fresh data
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['todos'] });
      qc.invalidateQueries({ queryKey: ['todo', id] });
    },
  })
}

// Hook to delete a todo
export function useDeleteTodo(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const ret = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!ret.ok)
        throw new Error('Delete failed');
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['todos'] });
      qc.invalidateQueries({ queryKey: ['todo', id] });
    },
  });
}