'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchTodos, createTodoApi } from './apiClient'
import { SortDir, SortKey, TodoCreate } from '@/types/todo'

export function useTodos(sortKey: SortKey, sortDir: SortDir) {
  return useQuery({ queryKey: ['todos', sortKey, sortDir], queryFn: () => fetchTodos(sortKey, sortDir) });
}

export function useCreateTodo() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (payload: TodoCreate) => createTodoApi(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['todos'] }),
  });
}
