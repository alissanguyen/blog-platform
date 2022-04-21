import React, { forwardRef, ReactNode, useState } from "react";
import clsx from "clsx";
import { Eye, EyeSlash, Question } from "phosphor-react";
import { Tooltip } from "../Tooltip";

const MAX_LENGTH_INPUT = 256;

type TInputTypes = "email" | "text" | "password";
type TInputSizes = "xs" | "sm" | "md" | "lg" | "xl";

type TInputProps = {
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
  error?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: () => void;
  onFocus?:
    | (() => void)
    | ((event: React.ChangeEvent<HTMLInputElement>) => void);
};

const inputSizes = {
  xs: "px-2.5 py-1",
  sm: "px-3 py-1.5",
  md: "px-3.5 py-2",
  lg: "px-4 py-2.5",
  xl: "px-5 py-3",
};

const Input = forwardRef<HTMLInputElement, TInputProps>(
  (
    {
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
      onFocus,
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isFocus, setIsFocus] = useState<boolean>(false);

    const defaultClassName = "flex flex-col items-stretch";
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
              "relative flex items-center rounded-lg border ring-4",
              inputSizes[size],
              error
                ? isFocus
                  ? "border-red-700 ring-red-100"
                  : "border-red-700 ring-transparent"
                : isFocus
                ? "border-primary-300 ring-primary-100"
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              {...rest}
            />
            {hint && (
              <Tooltip message={hint} className="-mr-1 ml-2">
                <Question size={18} className={clsx(error && "text-red-700")} />
              </Tooltip>
            )}
            {suffix && suffix}
            {type === "password" && (
              <button
                type="button"
                className={clsx(
                  "-mr-1 ml-2 outline-none",
                  error && "text-red-700"
                )}
                onClick={() => setShowPassword((prevState) => !prevState)}
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={20} /> : <EyeSlash size={20} />}
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
