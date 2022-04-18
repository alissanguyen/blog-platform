import type { LinksFunction } from "@remix-run/server-runtime";
import * as React from "react";
import styles from "./Footer.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const Footer: React.FC = () => {
  return <div>Copyrights etc...</div>;
};

export default Footer;
