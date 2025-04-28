'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

export async function createReviewAction(formData: FormData) {
  const bookId = formData.get('bookId')?.toString();
  const content = formData.get('content')?.toString();
  const author = formData.get('author')?.toString();

  if (!bookId || !content || !author) {
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: 'POST',
        body: JSON.stringify({ bookId, content, author }),
      },
    );
    console.log(response.status);

    // 1. 특정 주소의 해당하는 페이지만 재검증
    revalidatePath(`/book/${bookId}`); // next 서버에 해당 페이지 재검증 요청, **중요 - 페이지 컴포넌트 재렌더링, 페이지 자식 컴포넌트 모두 다시 재렌더링, 데이터 캐시 무효화 - 삭제, 풀라우트 캐시 무효화 - 삭제

    // 2. 특정 경로의 모든 동적 페이지를 재검증
    // revalidatePath('/book/[id]', 'page');

    //3. 특정 레이아웃을 갖는 모든 페이지를 재검증
    // revalidatePath('/(with-searchbar)', 'layout');

    //4. 모든 데이터를 재검증
    // revalidatePath('/', 'layout');

    //5. 태그 기준, 데이터 캐시 재검증
    //  revalidateTag('tag'); fetch 메서드 태그와 같은 값
    // {next : {tags : [`review-${bookId}`]}}
  } catch (error) {
    console.error(error);
  }
}
