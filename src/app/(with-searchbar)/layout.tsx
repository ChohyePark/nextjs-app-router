export default function Layout ({children} : {children : React.ReactNode}) {
  return <div>
    <div>임시 서치바</div>
    <div>{children}</div>
  </div>;
}