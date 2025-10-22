import ToDoCard from "@/components/ToDoCard";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Welcome to Next.js!</h1>
      <ToDoCard todo={{
        id: "1",
        title: "Sample ToDo",
        completed: false,
        createdAt: new Date()
      }} />
    </div>
   );
}
