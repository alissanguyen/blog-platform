import React, { ReactNode } from "react";
import { Link, LinkProps } from "@remix-run/react";
import clsx from "clsx";

type TButtonTypes = "button" | "submit" | "reset";
type TButtonVariants = "text" | "contained" | "outlined";
type TButtonColors = "neutral" | "blue" | "green" | "red" | "yellow";
type TButtonSizes = "xs" | "sm" | "md" | "lg" | "xl";
type TButtonRounded = "xs" | "sm" | "md" | "lg" | "xl" | "full";
type TButtonTransforms = "normal" | "lowercase" | "uppercase" | "capitalize";

type TBaseProps = {
  children: ReactNode;
  variant?: TButtonVariants;
  color?: TButtonColors;
  size?: TButtonSizes;
  rounded?: TButtonRounded;
  transform?: TButtonTransforms;
  type?: TButtonTypes;
  fluid?: boolean;
  loading?: boolean;
  disabled?: boolean;
  to?: string;
  className?: string;
  target?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onClick?: (() => void) | ((event: React.MouseEvent<HTMLElement>) => void);
};

type TButtonAsButton = TBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof TBaseProps> & {
    as?: "button";
  };

type TButtonAsLink = TBaseProps &
  Omit<LinkProps, keyof TBaseProps> & {
    as: "a";
  };

type TButtonProps = TButtonAsButton | TButtonAsLink;

const buttonVariants = {
  text: {
    neutral: "border-transparent text-neutral-700 hover:bg-neutral-100",
    blue: "border-transparent text-blue-500 hover:bg-blue-50",
    red: "border-transparent text-red-500 hover:bg-red-50",
    green: "border-transparent text-green-500 hover:bg-green-50",
    yellow: "border-transparent text-yellow-700 hover:bg-yellow-50",
  },
  contained: {
    neutral:
      "bg-neutral-700 border-neutral-700 text-white hover:bg-neutral-900 hover:border-neutral-900 hover:shadow-lg",
    blue: "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 hover:shadow-lg",
    red: "bg-red-500 border-red-500 text-white hover:bg-red-600 hover:border-red-600 hover:shadow-lg",
    green:
      "bg-green-500 border-green-500 text-white hover:bg-green-600 hover:border-green-600 hover:shadow-lg",
    yellow:
      "bg-yellow-700 border-yellow-700 text-white hover:bg-yellow-900 hover:border-yellow-900 hover:shadow-lg",
  },
  outlined: {
    neutral: "border-neutral-700 text-neutral-700 hover:bg-neutral-100",
    blue: "border-blue-500 text-blue-500 hover:bg-blue-50",
    red: "border-red-500 text-red-500 hover:bg-red-50",
    green: "border-green-500 text-green-500 hover:bg-green-50",
    yellow: "border-yellow-700 text-yellow-700 hover:bg-yellow-50",
  },
  disabled: {
    text: "disabled:cursor-not-allowed disabled:text-neutral-400 disabled:hover:bg-transparent",
    contained:
      "disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-500 disabled:hover:shadow-none",
    outlined:
      "disabled:cursor-not-allowed disabled:text-neutral-400 disabled:border-neutral-400",
  },
};

const buttonSizes = {
  xs: "text-caption py-1 px-[8px]",
  sm: "text-body-sm py-1 px-[10px]",
  md: "text-body-md py-[6px] px-4",
  lg: "text-body-lg py-2 px-[22px]",
  xl: "text-body-lg py-3 px-7",
};

const buttonRounded = {
  xs: "rounded-sm",
  sm: "rounded",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

const buttonTransforms = {
  normal: "normal-case",
  lowercase: "lowercase",
  uppercase: "uppercase",
  capitalize: "capitalize",
};

const Button = ({
  children,
  variant = "text",
  color = "blue",
  size = "md",
  transform = "capitalize",
  type = "button",
  fluid,
  rounded = "full",
  disabled = false,
  loading,
  className,
  target = "_self",
  prefix,
  suffix,
  onClick,
  ...rest
}: TButtonProps) => {
  const defaultClassName =
    "relative inline-flex justify-center overflow-hidden items-center border outline-none font-semibold transition-all duration-200";
  const allClassNames = clsx(
    defaultClassName,
    className,
    buttonVariants[variant][color],
    buttonSizes[size],
    buttonRounded[rounded],
    buttonTransforms[transform],
    disabled && buttonVariants["disabled"][variant],
    fluid ? "w-full" : "w-auto"
  );

  const createRipple = (event: React.MouseEvent<HTMLElement>) => {
    const button = event.currentTarget;
    const circle = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;

    const rippleColors = {
      neutral: "bg-neutral-500",
      blue: "bg-blue-400",
      red: "bg-red-400",
      green: "bg-green-400",
      yellow: "bg-yellow-600",
    };

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - (rect.left + radius)}px`;
    circle.style.top = `${event.clientY - (rect.top + radius)}px`;
    circle.classList.add(
      "button-ripple",
      "absolute",
      "rounded-full",
      "scale-0",
      "animate-ripple",
      variant === "contained" ? "bg-white" : rippleColors[color]
    );

    setTimeout(() => {
      circle.remove();
    }, 600);

    button.appendChild(circle);
  };

  if (rest.as === "a") {
    const { as, to = "/", ...otherAttr } = rest;

    return (
      <Link
        to={to}
        className={allClassNames}
        onClick={createRipple}
        target={target}
        {...otherAttr}
      >
        {prefix && <span className="mr-2">{prefix}</span>}
        {children}
        {suffix && <span className="ml-2">{suffix}</span>}
      </Link>
    );
  }

  const { as, ...otherAttr } = rest;
  return (
    <button
      type={type}
      className={allClassNames}
      onClick={(event) => {
        createRipple(event);
        onClick && onClick(event);
      }}
      disabled={disabled}
      {...otherAttr}
    >
      {prefix && <span className="mr-2">{prefix}</span>}
      {children}
      {suffix && <span className="ml-2">{suffix}</span>}
    </button>
  );
};

export default Button;
