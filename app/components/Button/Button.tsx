import type { ReactNode } from "react";
import React from "react";
import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import clsx from "clsx";

type TButtonTypes = "button" | "submit" | "reset";
type TButtonVariants = "text" | "contained" | "outlined";
type TButtonColors =
  | "primary"
  | "neutral"
  | "blue"
  | "green"
  | "red"
  | "yellow";
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
    primary:
      "border-transparent text-primary-700 hover:bg-primary-50 focus:ring-primary-100",
    neutral:
      "border-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-200",
    blue: "border-transparent text-blue-500 hover:bg-blue-50 focus:ring-blue-100",
    red: "border-transparent text-red-700 hover:bg-red-50 focus:ring-red-100",
    green:
      "border-transparent text-green-600 hover:bg-green-50 focus:ring-green-100",
    yellow:
      "border-transparent text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-100",
  },
  contained: {
    primary:
      "bg-primary-600 border-primary-600 text-white hover:bg-primary-700 hover:border-primary-700 focus:ring-primary-100",
    neutral:
      "bg-neutral-700 border-neutral-700 text-white hover:bg-neutral-900 hover:border-neutral-900 focus:ring-neutral-200",
    blue: "bg-blue-500 border-blue-500 text-white hover:bg-blue-600 hover:border-blue-600 focus:ring-blue-100",
    red: "bg-red-700 border-red-700 text-white hover:bg-red-800 hover:border-red-800 focus:ring-red-100",
    green:
      "bg-green-600 border-green-600 text-white hover:bg-green-700 hover:border-green-700 focus:ring-green-100",
    yellow:
      "bg-yellow-300 border-yellow-300 text-black hover:bg-yellow-400 hover:border-yellow-400 focus:ring-yellow-100",
  },
  outlined: {
    primary:
      "border-primary-700 bg-primary-50 text-primary-700 hover:bg-primary-100 focus:ring-primary-100",
    neutral:
      "bg-white border-neutral-500 text-neutral-700 hover:bg-neutral-100 focus:ring-neutral-200",
    blue: "border-blue-500 text-blue-500 hover:bg-blue-50 focus:ring-blue-100",
    red: "border-red-700 text-red-700 hover:bg-red-50 focus:ring-red-100",
    green:
      "border-green-600 text-green-600 hover:bg-green-50 focus:ring-green-100",
    yellow:
      "border-yellow-500 text-yellow-500 hover:bg-yellow-50 focus:ring-yellow-100",
  },
  disabled: {
    text: "disabled:cursor-not-allowed disabled:text-neutral-400 disabled:hover:bg-transparent",
    contained:
      "disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:border-neutral-300 disabled:text-neutral-500 disabled:hover:shadow-none",
    outlined:
      "disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:text-neutral-400 disabled:border-neutral-400",
  },
};

const buttonSizes = {
  xs: "text-caption py-1 px-[8px]",
  sm: "text-body-sm py-1 px-[10px]",
  md: "text-body-md py-[6px] px-4",
  lg: "text-body-lg py-2 px-[22px]",
  xl: "text-lead-2 py-3 px-7",
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
  color = "primary",
  size = "md",
  transform = "normal",
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
    "relative inline-flex justify-center overflow-hidden items-center border outline-none font-semibold transition-all duration-200 focus:ring focus:ring-4";
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
      primary: "bg-primary-500",
      neutral: "bg-neutral-500",
      blue: "bg-blue-300",
      red: "bg-red-400",
      green: "bg-green-300",
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
