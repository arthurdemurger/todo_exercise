import { Todo } from "@/types/todo";

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <li className="card flex items-center justify-between">
      <div className="min-w-0">
        <h3 className={`text-lg font-semibold truncate ${todo.completed ? 'line-through text-gray-400' : ''}`}>
          {todo.title}
        </h3>
        <div className="text-xs muted">{new Date(todo.createdAt).toLocaleString()}</div>
      </div>

      <div className="flex flex-col items-end gap-2 ml-4">
        <span className={`text-xs px-2 py-0.5 rounded-full ${todo.completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
          {todo.completed ? 'Completed' : 'Incomplete'}
        </span>
        <button className="text-xs text-blue-600 hover:underline">Details</button>
      </div>
    </li>
  );
}
