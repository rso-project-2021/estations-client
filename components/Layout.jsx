import { useRouter } from "next/router";
import Nav from "./Nav";

const Layout = ({ children }) => {

  const router = useRouter();
  let showHeader = !(router.pathname === "/login");

  return (
    <>
      {showHeader && <Nav />}
      <div>
        <main>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout;
