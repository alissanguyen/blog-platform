import type { LinksFunction } from "@remix-run/server-runtime";
import * as React from "react";
import { defaultLayoutClassname } from "~/constants";
import styles from "./NavBar.css";

interface Props {}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

const NavBar: React.FC<Props> = (props) => {
  return <div className={`NavBar__Wrapper pt-10 ${defaultLayoutClassname} flex flex-row items-center`}>
    {/* TODO: Update app name */}
    <span className="uppercase font-medium text-5xl">Logo Name</span>
    <div>
      {/* TODO: Add Sign in button */}
      {/* TODO: Add Create account button */}
    </div>
    </div>;
};

export default NavBar;
