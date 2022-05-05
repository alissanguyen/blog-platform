import type { ReactNode } from "react";
import React, { forwardRef, useState } from "react";
import clsx from "clsx";
import { Eye, EyeSlash, Question } from "phosphor-react";
import Tooltip from "../Tooltip/Tooltip";

const MAX_LENGTH_INPUT = 256;

type TInputVariants = "text" | "outlined";
type TInputTypes = "email" | "text" | "password";
type TInputSizes = "xs" | "sm" | "md" | "lg" | "xl";

type TInputProps = {
  variant?: TInputVariants;
  type?: TInputTypes;
  size?: TInputSizes;
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  hint?: string;
  description?: string;
  autoFocus?: boolean;
  autoComplete?: string;
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  disabled?: boolean;
  required?: boolean;
  id?: string;
  onChange?: () => void;
  onFocus?:
  | (() => void)
  | ((event: React.ChangeEvent<HTMLInputElement>) => void);
};

const inputTextSizes = {
  xs: "py-1",
  sm: "py-1.5",
  md: "py-2",
  lg: "py-2.5",
  xl: "py-3",
};

const inputOutlinedSizes = {
  xs: "px-2.5 py-1",
  sm: "px-3 py-1.5",
  md: "px-3.5 py-2",
  lg: "px-4 py-2.5",
  xl: "px-5 py-3",
};

// eslint-disable-next-line react/display-name
const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
      variant = "outlined",
      type = "text",
      size = "md",
      name,
      label,
      placeholder = "",
      className,
      maxLength = MAX_LENGTH_INPUT,
      hint,
      description,
      error,
      prefix,
      suffix,
      disabled,
      required,
      onFocus,
      id,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const defaultClassName = "flex flex-col items-stretch mb-3";
    const allClassNames = clsx(defaultClassName, className);

    const handleFocus = (event: React.ChangeEvent<HTMLInputElement>) => {
      setIsFocus(true);
      onFocus && onFocus(event);
    };

    const handleBlur = () => {
      setIsFocus(false);
    };

    return (
      <div className={allClassNames}>
        <label className="w-full">
          <div className="mb-1 text-body-sm font-semibold">{label}</div>
          <div
            className={clsx(
              "relative flex items-center",
              variant === "text"
                ? "border-b after:absolute after:left-0 after:top-full after:h-0.5 after:w-0 after:border-b-2 after:border-primary-300 after:transition-all after:duration-300"
                : "rounded-lg border ring-4",
              variant === "text"
                ? inputTextSizes[size]
                : inputOutlinedSizes[size],
              disabled && "bg-neutral-200",
              error
                ? isFocus
                  ? "border-red-700 ring-red-100"
                  : "border-red-700 ring-transparent"
                : isFocus
                  ? clsx(
                    variant === "text"
                      ? "after:w-full"
                      : "border-primary-300 ring-primary-100"
                  )
                  : "border-neutral-400 ring-transparent"
            )}
          >
            {prefix && prefix}
            <input
              {...(type === "password" && showPassword
                ? { type: "text" }
                : { type: "password" })}
              {...(!(type === "password") && { type: type })}
              className="w-full border-none bg-transparent outline-none"
              maxLength={maxLength}
              aria-labelledby={name}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              ref={ref}
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...id ? id : null}
              {...required ? required : null}
              {...rest}
            />
            {hint && (
              <Tooltip
                message={hint}
                className={clsx(
                  "ml-2",
                  variant === "outlined" ? "-mr-1" : "mr-1"
                )}
              >
                <Question size={18} className={clsx(error && "text-red-700")} />
              </Tooltip>
            )}
            {suffix && suffix}
            {type === "password" && (
              <button
                type="button"
                className={clsx(
                  "ml-2 outline-none",
                  variant === "outlined" ? "-mr-1" : "mr-1",
                  error && "text-red-700"
                )}
                onClick={() => setShowPassword((prevState) => !prevState)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={19} /> : <EyeSlash size={19} />}
              </button>
            )}
          </div>
        </label>
        {description && (
          <p className="mt-1 text-body-sm text-neutral-600">{description}</p>
        )}
        {error && <p className="mt-1 text-body-sm text-red-700">{error}</p>}
      </div>
    );
  }
);

export default Input;
