import clsx from "clsx";

type TLabelPlacement = "start" | "end" | "top" | "bottom";
type TCheckboxColors = "neutral" | "blue" | "green" | "red" | "yellow";

type TCheckboxProps = {
  color?: TCheckboxColors;
  label?: string;
  labelPlacement?: TLabelPlacement;
  size?: number;
  className?: string;
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
  neutral:
    "bg-neutral-700 ring-neutral-700 hover:bg-neutral-900 hover:ring-neutral-900",
  blue: "bg-blue-500 ring-blue-500 hover:bg-blue-600 hover:ring-blue-600",
  green: "bg-green-500 ring-green-500 hover:bg-green-600 hover:ring-green-600",
  red: "bg-red-500 ring-red-500 hover:bg-red-600 hover:ring-red-600",
  yellow:
    "bg-yellow-800 ring-yellow-800 hover:bg-yellow-900 hover:ring-yellow-900",
};

const Checkbox = ({
  color = "blue",
  label,
  labelPlacement = "end",
  size = 16,
  className,
  disabled = false,
  checked,
  onChange,
  ...rest
}: TCheckboxProps) => {
  const clickableClassName = checked
    ? "before:scale-0 after:delay-200 after:scale-100 after:visible"
    : "before:scale-100 ring-neutral-600 after:scale-0 after:invisible";
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
        "text-sm inline-flex select-none items-center gap-2",
        labelPlacementStyles[labelPlacement],
        disabled ? "cursor-not-allowed" : "cursor-pointer"
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
