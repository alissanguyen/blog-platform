import type { LinksFunction } from "@remix-run/server-runtime";
import Header, { links as HeaderStyles } from "~/components/Header/Header";
import NavBar from "~/components/NavBar/NavBar";
import FeedSection from "~/sections/FeedSection.tsx/FeedSection";
import TrendingSection from "~/sections/TrendingSection/TrendingSection";
import styles from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [...HeaderStyles(), { rel: "stylesheet", href: styles }];
};

export default function Index() {
  return (
    <main className="HomePage">
      <div className="Hero__Wrapper">
        <NavBar />
        <Header />
      </div>
      <TrendingSection />
      <FeedSection />
    </main>
  );
}
