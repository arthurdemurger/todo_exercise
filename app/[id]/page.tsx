import TodoDetailClient from './TodoDetailClient'

// Server component to fetch and display todo details
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return (
    <TodoDetailClient id={id} />
  );
}
