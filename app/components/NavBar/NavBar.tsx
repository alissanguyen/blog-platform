import type { LinksFunction } from "@remix-run/server-runtime";
import * as React from "react";
import styles from "./NavBar.css";

interface Props {}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const NavBar: React.FC<Props> = (props) => {
  return <div>App Navigation Bar</div>;
};

export default NavBar;
