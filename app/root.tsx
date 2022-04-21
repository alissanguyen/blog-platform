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
  useLoaderData,
} from "@remix-run/react";

import globalStyles from "./styles/global.css";
import tailwind from "./styles/tailwind.css";
import tailwindCustom from "./styles/tailwindcustom.css"
import { getUser } from "./session.server";
import { ThemeContextProvider, useTheme } from "./providers/themeProvider";
import { SupportedTheme } from "./types";
import { getThemeSession } from "./utils/theme.server";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: tailwind },
    { rel: "stylesheet", href: tailwindCustom },
  ];
};

// TODO: Update meta for SEO
export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>
  theme: SupportedTheme;
};

export const loader: LoaderFunction = async ({ request }) => {
  const themeValue = await getThemeSession(request);

  return json<LoaderData>({
    user: await getUser(request),
    theme: themeValue.getTheme()
  });
};

export default function App() {
  const { theme } = useLoaderData();

  return (
    <ThemeContextProvider initialTheme={theme}>
      <Document>
        <Layout>
          <Outlet />
        </Layout>
      </Document>
    </ThemeContextProvider>
  );
}

const convertSupportedThemeToClassName = (
  theme: SupportedTheme,
): string => {
  if (theme === SupportedTheme.LIGHT) {
    return "light-theme";
  } else {
    
    return "dark-theme";
  }
};

const Document: React.FC = (props) => {
  const { theme } = useTheme();

  return (
    <html lang="en" className={`${convertSupportedThemeToClassName(theme)} h-full`}>
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
