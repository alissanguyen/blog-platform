import type { LinksFunction } from "@remix-run/server-runtime";
import Header, { links as HeaderStyles } from "~/components/Header/Header";
import NavBar, { links as NavBarStyles } from "~/components/NavBar/NavBar";
import TrendingSection, {
  links as TrendingSectionStyles,
} from "~/sections/TrendingSection/TrendingSection";

export const links: LinksFunction = () => {
  return [...HeaderStyles(), ...TrendingSectionStyles(), ...NavBarStyles()];
};

export default function Index() {
  return (
    <main className="HomePage">
      <NavBar />
      <Header />
      <TrendingSection />
    </main>
  );
}
