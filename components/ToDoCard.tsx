import Link from "next/link";
import { useUpdateTodo } from "@/lib/queries";
import { Todo } from "@/types/todo";

export default function TodoCard({ todo }: { todo: Todo }) {
  const { mutate, isPending } = useUpdateTodo(todo.id);

  function onCheckboxClick(e: React.MouseEvent<HTMLInputElement>) {
    e.stopPropagation();
  }

  function onCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    mutate({ completed: !todo.completed });
  }

  return (
    <li>
      <Link href={`/${todo.id}`} className="card flex items-center justify-between p-4">
        <div>
          <div className={todo.completed ? 'line-through text-gray-400' : ''}>
            {todo.title}
          </div>
          <div className="text-xs text-gray-500">
            {new Date(todo.createdAt).toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              checked={todo.completed}
              onClick={onCheckboxClick}
              onChange={onCheckboxChange}
              disabled={isPending}
            />
            {isPending ? 'Updating…' : (todo.completed ? 'Completed' : 'Incomplete')}
          </label>
        </div>
      </Link>
    </li>
  );
}
