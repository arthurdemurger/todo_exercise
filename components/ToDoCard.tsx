import Link from "next/link";
import { useUpdateTodo } from "@/lib/queries";
import { Todo } from "@/types/todo";

export default function TodoCard({ todo }: { todo: Todo }) {
  const { mutate, isPending } = useUpdateTodo(todo.id);

  return (
    <li className="card flex items-center justify-between">
      <div>
        <div className={todo.completed ? 'line-through text-gray-400' : ''}>
          {todo.title}
        </div>
        <div className="text-xs text-gray-500">
          {new Date(todo.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="flex items-center gap-4">

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => mutate({ completed: !todo.completed })}
            disabled={isPending}
          />
          {isPending ? 'Updating…' : (todo.completed ? 'Completed' : 'Incomplete')}
        </label>

        <Link href={`/${todo.id}`}>
          <button
            type="button"
            className="btn btn-sm px-3 py-1 text-sm text-yellow-700 hover:bg-yellow-200 focus:ring-yellow-500"
            aria-label={`Edit todo ${todo.title}`}
          >
            Edit
          </button>
        </Link>
      </div>
    </li>
  );
}
