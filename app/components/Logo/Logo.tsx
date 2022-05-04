import clsx from "clsx";

type TLogoProps = {
  className?: string;
};

const defaultClassName = "text-3xl font-medium uppercase";

const Logo = ({ className }: TLogoProps) => {
  const allClassNames = clsx(defaultClassName, className);

  return <span className={allClassNames}>Logo Name</span>;
};

export default Logo;
