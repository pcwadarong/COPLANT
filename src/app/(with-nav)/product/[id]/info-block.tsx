'use client';

export default function InfoBlock({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="space-y-2 mb-10">
      <h2 className="font-bold text-3xl font-english">{title}</h2>
      <p>{content}</p>
    </div>
  );
}
