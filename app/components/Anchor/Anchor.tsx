import { ReactChild, ReactChildren } from "react";
import { Link } from "@remix-run/react";
import clsx from "clsx";

type TAnchorProps = {
  to: string;
  children: ReactChild | ReactChildren;
  className?: string;
};

const defaultClassName = "text-primary-700 hover:underline";

const Anchor = ({ to, children, className }: TAnchorProps) => {
  const allClassNames = clsx(defaultClassName, className);

  return (
    <Link className={allClassNames} to={to}>
      {children}
    </Link>
  );
};

export default Anchor;
