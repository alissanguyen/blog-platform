import type { LinksFunction } from "@remix-run/server-runtime";
import Header, { links as HeaderStyles } from "~/components/Header/Header";
import NavBar from "~/components/NavBar/NavBar";
import TrendingSection, {
  links as TrendingSectionStyles,
} from "~/sections/TrendingSection/TrendingSection";

export const links: LinksFunction = () => {
  return [...HeaderStyles(), ...TrendingSectionStyles()];
};

export default function Index() {
  return (
    <main className="HomePage">
      <div className="Hero__Wrapper">
      <NavBar />
      <Header />
      </div>
      <TrendingSection />
    </main>
  );
}
