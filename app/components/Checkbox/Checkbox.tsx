import clsx from "clsx";

type TLabelPlacement = "start" | "end" | "top" | "bottom";
type TCheckboxColors =
  | "primary"
  | "neutral"
  | "blue"
  | "green"
  | "red"
  | "yellow";

type TCheckboxProps = {
  color?: TCheckboxColors;
  label?: string;
  labelPlacement?: TLabelPlacement;
  size?: number;
  className?: string;
  containerClassName?: string;
  disabled?: boolean;
  checked: boolean;
  onChange: () => void;
};

const labelPlacementStyles = {
  start: "flex-row-reverse",
  end: "flex-row",
  top: "flex-col-reverse",
  bottom: "flex-col",
};

const checkboxColors = {
  primary: "bg-primary-700 text-primary-700",
  neutral: "bg-neutral-700 text-neutral-700",
  blue: "bg-blue-500 text-blue-500",
  green: "bg-green-500 text-green-500",
  red: "bg-red-700 text-red-700",
  yellow: "bg-yellow-400 text-yellow-400",
};

const Checkbox = ({
  color = "primary",
  label,
  labelPlacement = "end",
  size = 16,
  className,
  containerClassName,
  disabled = false,
  checked,
  onChange,
  ...rest
}: TCheckboxProps) => {
  const clickableClassName = checked
    ? "ring-current before:scale-0 after:delay-150 after:scale-100 after:visible"
    : "ring-neutral-500 before:scale-100 after:scale-0 after:invisible";
  const disabledClassName = checked
    ? "before:scale-0 bg-gray-300 ring-gray-300 after:scale-100 after:visible"
    : "before:scale-100 ring-neutral-400 after:scale-0 after:invisible";
  const defaultClassName =
    "relative inline-flex items-center justify-center w-checkbox h-checkbox overflow-hidden ring-2 rounded transition-all after:w-1/3 after:h-2/3 after:border-r-2 after:border-b-2 after:border-white after:-translate-y-px after:rotate-45 after:duration-100 after:ease-linear after:transition-transform before:duration-150 before:absolute before:w-full before:h-full before:bg-white";
  const allClassNames = clsx(
    defaultClassName,
    disabled
      ? disabledClassName
      : clsx(checkboxColors[color], clickableClassName),
    className
  );

  return (
    <label
      className={clsx(
        "text-sm inline-flex select-none items-center gap-3",
        labelPlacementStyles[labelPlacement],
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        containerClassName
      )}
      style={{
        ["--checkbox-size" as any]: `${size}px`,
      }}
    >
      <span className={allClassNames}></span>
      <input
        className="hidden"
        type="checkbox"
        defaultChecked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      {label}
    </label>
  );
};

export default Checkbox;
