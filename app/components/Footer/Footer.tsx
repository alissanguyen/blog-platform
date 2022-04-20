import type { LinksFunction } from "@remix-run/server-runtime";
import * as React from "react";
import { Option, Select } from "../Select";
import styles from "./Footer.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const Footer: React.FC = () => {
  // TODO: Add links to footer
  return <div>Copyrights etc...</div>;
};

export default Footer;
