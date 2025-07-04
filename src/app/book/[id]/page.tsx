import { notFound } from 'next/navigation';
import style from './page.module.css';
import ReviewEditor from '@/components/review-editor';
import { ReviewData } from '@/types';
import ReviewItem from '@/components/review-item';

// export const dynamicParams = false;
// 위와 같이 설정하면 generateStaticParams로 넘긴 url 외의 경로로 접근하면 404 페이지로 이동함

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }

  const book = await response.json();

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`,
  );

  // 에러 처리
  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: bookId } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={bookId} />
      <ReviewEditor bookId={bookId} />
      <ReviewList bookId={bookId} />
    </div>
  );
}
