import type { ReactChild, ReactChildren } from "react";
import clsx from "clsx";

type TContainerProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  className?: string;
};

const Container = ({ children, className }: TContainerProps) => {
  const defaultClassName = "max-w-screen-2xl m-auto px-10 2xl:px-0";
  const allClassNames = clsx(defaultClassName, className);

  return <div className={allClassNames}>{children}</div>;
};

export default Container;
