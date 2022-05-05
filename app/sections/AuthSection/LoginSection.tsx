import Anchor from "~/components/Anchor/Anchor";
import Button from "~/components/Button/Button";
import Checkbox from "~/components/Checkbox/Checkbox";
import Input from "~/components/Input/Input";
import Logo from "~/components/Logo/Logo";
import useToggle from "~/hooks/useToggle";

const LoginSection = () => {
  const [keepLoggedIn, toggle] = useToggle();

  return (
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
          <form className="my-6 flex flex-col items-stretch">
            <Input variant="text" label="Email" name="email" />
            <Input
              variant="text"
              label="Password"
              name="password"
              type="password"
            />
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
          </form>
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
  );
};

export default LoginSection;
