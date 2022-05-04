import React from "react";
import { Anchor } from "~/components/Anchor";
import { Button } from "~/components/Button";
import { Checkbox } from "~/components/Checkbox";
import { Input } from "~/components/Input";
import { Logo } from "~/components/Logo";
import { useToggle } from "~/hooks";

const RegisterSection = () => {
  const [acceptTerms, toggle] = useToggle(true);

  return (
    <div className="relative z-elevate flex w-1/2 flex-col justify-between bg-white p-6">
      <Logo />
      <div className="flex flex-1 items-center justify-center">
        <div className="flex w-full max-w-[350px] flex-col items-stretch">
          <h1 className="text-lead-1 font-bold">Let&apos;s get start</h1>
          {/* TODO: update the slogan (ex: login now to get...) */}
          <p className="text-neutral-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim,
            reprehenderit!
          </p>
          <form className="my-6 flex flex-col items-stretch">
            <Input variant="text" size="xs" label="Email" name="email" />
            <Input variant="text" size="xs" label="Username" name="username" />
            <Input
              variant="text"
              size="xs"
              label="Password"
              name="password"
              type="password"
            />
            <Input
              variant="text"
              size="xs"
              label="Confirm password"
              name="confirm-password"
              type="password"
            />
            <div className="mb-4 flex items-center">
              <Checkbox
                label="I accept the"
                checked={acceptTerms}
                onChange={toggle}
              />
              <Anchor className="ml-1 inline-block" to="/#">
                terms &amp; condition
              </Anchor>
            </div>
            <div className="px-4">
              <Button type="submit" variant="contained" fluid>
                Register
              </Button>
            </div>
          </form>
          <div className="mb-3">
            {/* TODO: update register with other social button */}
            <div className="flex h-16 items-center justify-center bg-primary-100">
              Register with other social networks.
            </div>
          </div>
          <div className="text-center">
            <p className="text-body-sm">
              Already have an account? <Anchor to="/login">Login now</Anchor>
            </p>
          </div>
        </div>
      </div>
      {/* TODO: update brand name */}
      <div className="text-body-sm text-neutral-600">
        &copy; BRANDNAME {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default RegisterSection;
