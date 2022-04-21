import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import globalStyles from "./styles/global.css";
import tailwind from "./styles/tailwind.css";
import tailwindCustom from "./styles/tailwindcustom.css"
import { getUser } from "./session.server";
import NavBar, { links as NavBarStyles } from "./components/NavBar/NavBar";
import Footer, { links as FooterStyles } from "./components/Footer/Footer";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: tailwind },
    { rel: "stylesheet", href: tailwindCustom },
    ...NavBarStyles(),
    ...FooterStyles(),
  ];
};

// TODO: Update meta for SEO
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

export default function App() {
  return (
    <Document>
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

const Document: React.FC = (props) => {
  return (
    <html lang="en" className="h-full">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        {props.children}
      </body>
    </html>
  );
};

const Layout: React.FC = (props) => {
  return (
    <>
      <div className="App__Content">{props.children}</div>
    </>
  );
};

// TODO: Add ErrorBoundary and CatchBoundary
