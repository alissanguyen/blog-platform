import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import type { LinksFunction } from "@remix-run/server-runtime";
import * as React from "react";
import Anchor from "~/components/Anchor/Anchor";
import Button from "~/components/Button/Button";
import Checkbox from "~/components/Checkbox/Checkbox";
import Input from "~/components/Input/Input";
import Logo from "~/components/Logo/Logo";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { validateEmail } from "~/utils";

import useToggle from "~/hooks/useToggle";
import AnimationLogin, {
  links as AnimationLoginStyles
} from "~/sections/AuthSection/AnimationLogin";

export const links: LinksFunction = () => {
  return AnimationLoginStyles();
};


export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors?: {
    email?: string;
    password?: string;
  };
}

export const action: ActionFunction = async ({ request }) => {
  const FormData = await request.formData();
  const email = FormData.get("email");
  const password = FormData.get("password");
  const redirectTo = FormData.get("redirectTo");
  const remember = FormData.get("remember");

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  if (typeof password !== "string") {
    return json<ActionData>(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return json<ActionData>(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  }

  const user = await verifyLogin(email, password);

  if (!user) {
    return json<ActionData>(
      { errors: { email: "Invalid email or password" } },
      { status: 400 }
    );
  }

  return createUserSession({
    request,
    userId: user.id,
    remember: remember === "on" ? true : false,
    redirectTo: typeof redirectTo === "string" ? redirectTo : "/",
  });
};

export const meta: MetaFunction = () => {
  return {
    title: "Login",
  };
};

export default function LoginPage() {
  const [keepLoggedIn, toggle] = useToggle();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/";
  const actionData = useActionData() as ActionData;
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="flex min-h-screen w-screen items-stretch">
      <div className="flex w-1/2 flex-col justify-between bg-white p-6">
        <Logo />
        <div className="flex flex-1 items-center justify-center">
          <div className="flex max-w-[350px] flex-col items-stretch">
            <h1 className="text-lead-1 font-bold">Welcome back</h1>
            {/* TODO: update the slogan (ex: login now to get...) */}
            <p className="text-neutral-600">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim,
              reprehenderit!
            </p>
            <Form className="my-6 flex flex-col items-stretch" method="post">
              <Input ref={emailRef} id="email" variant="text" label="Email" name="email" type="email" aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error" required autoFocus={true}
                autoComplete="email" />
              {actionData?.errors?.email && (
                <div className="pt-1 text-red-700" id="email-error">
                  {actionData.errors.email}
                </div>
              )}
              <Input
                variant="text"
                label="Password"
                name="password"
                type="password"
                id="password"
                ref={passwordRef}
                autoComplete="current-password"
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                required
              />
              {actionData?.errors?.password && (
                <div className="pt-1 text-red-700" id="password-error">
                  {actionData.errors.password}
                </div>
              )}
              <div className="mb-4 flex items-center justify-between">
                <Checkbox
                  label="Keep me logged in."
                  checked={keepLoggedIn}
                  onChange={toggle}
                />
                <Anchor className="text-body-sm" to="/reset-password">
                  Forgot password?
                </Anchor>
              </div>
              <div className="px-4">
                <Button type="submit" variant="contained" fluid>
                  Login
                </Button>
              </div>
              <input type="hidden" name="redirectTo" value={redirectTo} />
            </Form>
            <div className="mb-3">
              {/* TODO: update login with other social button */}
              <div className="flex h-16 items-center justify-center bg-primary-100">
                Login with other social networks.
              </div>
            </div>
            <div className="text-center">
              <p className="text-body-sm">
                Don&apos;t have an account?{" "}
                <Anchor to="/register">Sign up</Anchor>
              </p>
            </div>
          </div>
        </div>
        {/* TODO: update brand name */}
        <div className="text-body-sm text-neutral-600">
          &copy; BRANDNAME {new Date().getFullYear()}
        </div>
      </div>
      <div className="hidden w-1/2 lg:block">
        <AnimationLogin />
      </div>
    </div>
  );
}
