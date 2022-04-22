import * as React from "react";
import { Container } from "../Container";
import { Button } from "../Button";

interface Props {}

const NavBar: React.FC<Props> = (props) => {
  return (
    <Container className="pt-10">
      <div className="NavBar__Wrapper flex flex-row items-center justify-between">
        {/* TODO: Update app name */}
        <span className="text-5xl font-medium uppercase">Logo Name</span>
        <div className="flex items-center">
          <Button
            as="a"
            to="/signin"
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
            to="/signup"
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
