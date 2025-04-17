"use client"; // 클라이언트 컴포넌트 명시
import React, { useState } from "react"
import { useRouter } from "next/navigation";
// page router => next/router
// app router => next/navigation

export default function SearchBar () {
  const router = useRouter();
  const[search, setSearch] = useState("");

  const onChacngeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {  
    setSearch(e.target.value);
  } // 상호작용 존재

  const onSubmit = () => {
    router.push(`/search?q=${search}`);
  }

  return <div>
    <input value={search} onChange={onChacngeSearch}/>
    <button onClick={onSubmit}>검색</button>
  </div>
}