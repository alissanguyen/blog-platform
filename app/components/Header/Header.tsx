import type { LinksFunction } from "@remix-run/server-runtime";
import * as React from "react";
import { Button } from "../Button";
import styles from "./Header.css";
import Illustration from "./Illustration";

interface Props {}
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};
const Header: React.FC<Props> = () => {
  return (
    <div className="Header__Wrapper m-auto grid grid-cols-3 border-b-2">
      <div className="Header__Illustration__Wrapper col-span-2 max-w-screen-2xl">
        <Illustration />
      </div>
      <div className="Header__Text flex flex-col items-baseline justify-center">
        <span className="mb-20 text-4xl font-bold">
          Welcome to ____, a place to express your ideas, opinions, and more!
        </span>
        <Button as="a" to="/write" variant="contained" color="yellow" size="xl">
          Start writing
        </Button>
      </div>
    </div>
  );
};

export default Header;
