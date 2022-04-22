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
      "border-transparent text-primary-700 hover:bg-primary-200 hover:ring-primary-600 focus:ring-primary-600 active:text-white active:bg-primary-600",
    neutral:
      "border-transparent text-neutral-700 hover:bg-neutral-200 hover:ring-neutral-600 focus:ring-neutral-600 active:text-white active:bg-neutral-600",
    blue: "border-transparent text-blue-700 hover:bg-blue-200 hover:ring-blue-600 focus:ring-blue-600 active:text-white active:bg-blue-600",
    red: "border-transparent text-red-700 hover:bg-red-200 hover:ring-red-600 focus:ring-red-600 active:text-white active:bg-red-600",
    green:
      "border-transparent text-green-700 hover:bg-green-200 hover:ring-green-600 focus:ring-green-600 active:text-white active:bg-green-600",
    yellow:
      "border-transparent text-yellow-700 hover:bg-yellow-200 hover:ring-yellow-600 focus:ring-yellow-600 active:text-white active:bg-yellow-600",
  },
  contained: {
    primary:
      "bg-primary-700 border-primary-700 text-white hover:ring-primary-700 focus:ring-primary-700 active:bg-primary-400 active:ring-primary-400 active:border-primary-400",
    neutral:
      "bg-neutral-900 border-neutral-900 text-white hover:ring-neutral-900 focus:ring-neutral-900 active:bg-neutral-600 active:ring-neutral-600 active:border-neutral-600",
    blue: "bg-blue-600 border-blue-600 text-white hover:border-blue-600 hover:ring-blue-600 focus:ring-blue-600 focus:border-blue-600 active:bg-blue-400 active:ring-blue-400 active:border-blue-400",
    red: "bg-red-700 border-red-700 text-white hover:ring-red-700 focus:ring-red-700 active:bg-red-500 active:ring-red-500 active:border-red-500",
    green:
      "bg-green-600 border-green-600 text-white hover:ring-green-600 focus:ring-green-600 active:bg-green-400 active:ring-green-400 active:border-green-400",
    yellow:
      "bg-yellow-500 border-yellow-500 text-white hover:ring-yellow-500 focus:ring-yellow-500 active:bg-yellow-400 active:ring-yellow-400 active:border-yellow-400",
  },
  outlined: {
    primary:
      "bg-white border-primary-600 text-primary-600 hover:ring-primary-600 focus:ring-primary-600 active:bg-primary-200",
    neutral:
      "bg-white border-neutral-900 text-neutral-900 hover:ring-neutral-900 focus:ring-neutral-900 active:bg-neutral-200",
    blue: "bg-white border-blue-600 text-blue-600 hover:ring-blue-600 focus:ring-blue-600 active:bg-blue-100",
    red: "bg-white border-red-600 text-red-600 hover:ring-red-600 focus:ring-red-600 active:bg-red-100",
    green:
      "bg-white border-green-600 text-green-600 hover:ring-green-600 focus:ring-green-600 active:bg-green-200",
    yellow:
      "bg-white border-yellow-700 text-yellow-700 hover:ring-yellow-700 focus:ring-yellow-700 active:bg-yellow-100",
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

const defaultClassName =
    "relative inline-flex justify-center overflow-hidden items-center border outline-none font-semibold transition-all duration-200 hover:ring focus:ring ring-offset-4";

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
      primary: "bg-primary-600",
      neutral: "bg-neutral-900",
      blue: "bg-blue-600",
      red: "bg-red-600",
      green: "bg-green-600",
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
        {prefix && <span className="Button mr-2">{prefix}</span>}
        {children}
        {suffix && <span className="Button ml-2">{suffix}</span>}
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
      {prefix && <span className="Button mr-2">{prefix}</span>}
      {children}
      {suffix && <span className="Button ml-2">{suffix}</span>}
    </button>
  );
};

export default Button;
