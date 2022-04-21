import { useState, ReactChild, ReactChildren, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { getTextWidth } from "~/utils";

type TTooltipDirection = "top" | "bottom" | "left" | "right";
type TTooltipColors = "dark" | "light";

type TTooltipProps = {
  direction?: TTooltipDirection;
  color?: TTooltipColors;
  title?: string;
  message: string;
  maxWidth?: number;
  children: ReactChild | ReactChildren;
  className?: string;
};

const tooltipMessageDirections = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-1",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-1",
  left: "right-full top-1/2 -translate-y-1/2 mr-1",
  right: "left-full top-1/2 -translate-y-1/2 ml-1",
};

const tooltipColors = {
  dark: "bg-black text-white",
  light: "bg-white text-black",
};

const Tooltip = ({
  className,
  title,
  message,
  maxWidth = 250,
  direction = "top",
  color = "dark",
  children,
}: TTooltipProps) => {
  const [isHovered, setHovered] = useState(false);
  const [overflow, setOverflow] = useState(false);
  const [delayHandler, setDelayHandler] = useState<any>(null);
  const isAbsolute = className && className.includes("absolute");
  const defaultClassName = "inline-flex items-center z-30";
  const allClassNames = clsx(
    defaultClassName,
    className,
    !isAbsolute && "relative"
  );
  const tooltipClassName = clsx(
    "absolute text-left text-body-sm px-3 py-2 rounded-lg drop-shadow-xl",
    tooltipMessageDirections[direction],
    tooltipColors[color]
  );

  useEffect(() => {
    if (getTextWidth(message) > maxWidth) {
      setOverflow(true);
    }
  }, []);

  const handleMouseEnter = () => {
    setDelayHandler(
      setTimeout(() => {
        setHovered(true);
      }, 400)
    );
  };

  const handleMouseLeave = () => {
    delayHandler && clearTimeout(delayHandler);
    setHovered(false);
  };

  return (
    <div
      className={allClassNames}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={false}
            animate={{ display: isHovered ? "block" : "none" }}
            className={tooltipClassName}
            style={{
              ...(overflow ? { width: maxWidth } : { whiteSpace: "nowrap" }),
            }}
          >
            {title && <p>{title}</p>}
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
