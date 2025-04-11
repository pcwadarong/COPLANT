export default async function AdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <div>{id} 제품 편집 페이지</div>;
}
