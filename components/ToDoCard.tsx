import { Todo } from "@/types/todo";

export default function TodoCard({ todo }: { todo: Todo }) {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold">{todo.title}</h2>
      <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
      <p>Created at: {new Date(todo.createdAt).toLocaleString()}</p>
    </div>
  );
}