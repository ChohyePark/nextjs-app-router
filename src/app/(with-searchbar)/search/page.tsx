import BookItem from '@/components/book-item';
import BookListSkeleton from '@/components/skeleton/book-list-skeleton';
import { BookData } from '@/types';
import { Suspense } from 'react';

async function SearchResult({ q }: { q: string }) {
  const response = await fetch(
    `
    ${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
  );

  if (!response.ok) {
    return <div>문제가 발생했습니다</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q || ''} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={q || ''} />
    </Suspense>
  );
}

// searchParams.q || "" -> q의 값이 없으면 빈문자열 사용.
// A || B  A가 false 면 B 사용
