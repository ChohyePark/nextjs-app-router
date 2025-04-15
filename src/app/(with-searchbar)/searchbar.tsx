"use client";
import React, { useState } from "react"
export default function SearchBar () {
  
  const[search, setSearch] = useState("");

  const onChacngeSearch = (e:React.ChangeEvent<HTMLInputElement>) => {  
    setSearch(e.target.value);
  }

  return <div>
    <input value={search} onChange={onChacngeSearch}/>
    <button>검색</button>
  </div>
}