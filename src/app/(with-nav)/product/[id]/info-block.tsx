'use client';

type InfoBlockProps = {
  title: string;
  content: string;
};

export default function InfoBlock({ title, content }: InfoBlockProps) {
  return (
    <div className="mb-10 space-y-2">
      <div
        role="heading"
        aria-level={2}
        className="text-3xl font-bold font-english"
      >
        {title}
      </div>

      <p>{content}</p>
    </div>
  );
}
