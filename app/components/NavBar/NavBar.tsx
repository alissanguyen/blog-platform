import * as React from "react";
import { Container } from "../Container";
import { Button } from "../Button";
import { Logo } from "../Logo";

interface Props {}

const NavBar: React.FC<Props> = (props) => {
  return (
    <Container className="pt-10">
      <div className="NavBar__Wrapper flex flex-row items-center justify-between">
        {/* TODO: Update app name */}
        <Logo />
        <div className="flex items-center">
          <Button
            as="a"
            to="/login"
            variant="text"
            color="primary"
            disabled
            size="lg"
            className="mr-3"
          >
            Sign in
          </Button>
          <Button
            as="a"
            to="/register"
            variant="contained"
            color="neutral"
            size="lg"
          >
            Create account
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NavBar;
