import type { User } from "@prisma/client";
import * as React from "react";
import { useOptionalUser } from "~/utils";
import Button from "../Button/Button";
import Container from "../Container/Container";
import Logo from "../Logo/Logo";

interface Props {}

const NavBar: React.FC<Props> = (props) => {
  const user: User | undefined = useOptionalUser();

  return (
    <Container className="pt-10">
      <div className="NavBar__Wrapper flex flex-row items-center justify-between">
        {/* TODO: Update app name */}
        <Logo />
        {user? <AuthorizedUserNavButtons user={user}/> : <UnauthorizedUserNavButtons/>}
      </div>
    </Container>
  );
};

export default NavBar;

interface NavButtonProps {
  user: User
}
const AuthorizedUserNavButtons: React.FC<NavButtonProps> = (props) => {
  
  return (
    <div className="flex items-center">
      <img src={props.user.id}/>
    </div>
  )
}
const UnauthorizedUserNavButtons = () => {
  return (
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
  )
}