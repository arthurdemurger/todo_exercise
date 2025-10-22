import { ToDo } from "@/types/todo";

export default function ToDoCard({ todo }: { todo: ToDo }) {
  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold">{todo.title}</h2>
      <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
      <p>Created At: {todo.createdAt.toLocaleDateString()}</p>
    </div>
  );
}