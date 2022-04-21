import type { LinksFunction } from "@remix-run/server-runtime";
import Header, {links as HeaderStyles} from "~/components/Header/Header";
import NavBar from "~/components/NavBar/NavBar";

export const links: LinksFunction = () => {
  return [...HeaderStyles()]
}

export default function Index() {

  return (
    <main className="HomePage">
      <NavBar/>
      <Header/>
    </main>
  );
}
