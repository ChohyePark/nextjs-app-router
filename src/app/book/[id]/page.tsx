import { notFound } from "next/navigation";
import style from "./page.module.css";


// export const dynamicParams = false; 
// 위와 같이 설정하면 generateStaticParams로 넘긴 url 외의 경로로 접근하면 404 페이지로 이동함

export function generateStaticParams () {
  return [{id : "1"}, {id : "2"} , {id : "3"}];
} // 미리 도서 데이터 정보를 넘겨줌 

export default async function Page({
  params,
}: {
  params: Promise<{id : string | string[] }> ;
}) {
  
  const {id: bookId} = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`)

  if (!response.ok) {
    if(response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>
  }

  const book = await response.json();
  
  const {
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl
  } = book;


  return (
    <div className={style.container}>
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
    </div>
  );
}
