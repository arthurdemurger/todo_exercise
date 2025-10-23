import TodoDetailClient from './TodoDetailClient'

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
