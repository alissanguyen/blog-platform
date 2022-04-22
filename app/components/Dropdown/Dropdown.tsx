import type {
  ReactChild,
  ReactChildren,
  ReactElement} from "react";
import React, {
  Fragment,
  useRef,
  useState,
} from "react";
import type { LinkProps } from "@remix-run/react";
import { Link } from "@remix-run/react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "~/hooks";
import clsx from "clsx";

type TMenuItemAs = "button" | "a";
type TMenuPosition = {
  vertical?: "top" | "bottom";
  horizontal?: "left" | "right";
};

type TDropdownProps = {
  children: ReactElement;
  overlay: ReactElement;
  className?: string;
};

type TMenuProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  open?: boolean;
  className?: string;
  position?: TMenuPosition;
};

type TMenuItemBaseProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
  className?: string;
  onClose?: () => void;
};

type TMenuItemAsButton = TMenuItemBaseProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    keyof TMenuItemBaseProps
  > & {
    as?: "button";
  };

type TMenuItemAsLink = TMenuItemBaseProps &
  Omit<LinkProps, keyof TMenuItemBaseProps> & {
    as: "a";
  };

type TMenuItemProps = TMenuItemAsButton | TMenuItemAsLink;

const menuPositions = {
  top: "bottom-full",
  bottom: "top-full",
  left: "right-0",
  right: "left-0",
};

export const Dropdown = ({ children, overlay, className }: TDropdownProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const defaultClassName = "inline-block relative z-dropdown";
  const allClassNames = clsx(defaultClassName, className);

  const onToggle = () => setOpen((prevState) => !prevState);
  const onClose = () => setOpen(false);

  useOnClickOutside(ref, onClose);

  return (
    <div className={allClassNames} ref={ref}>
      {React.cloneElement(children, { onClick: onToggle })}
      <Menu
        className={overlay.props.className}
        position={overlay.props.position}
        open={open}
      >
        {overlay.props.children.length ? (
          overlay.props.children.map(
            (menuItem: ReactElement, index: number) => (
              <Fragment key={index}>
                {React.cloneElement(menuItem, { onClose })}
              </Fragment>
            )
          )
        ) : (
          <Fragment>
            {React.cloneElement(overlay.props.children, { onClose })}
          </Fragment>
        )}
      </Menu>
    </div>
  );
};

export const Menu = ({ children, open, className, position }: TMenuProps) => {
  const verticalPosition = (position && position.vertical) || "bottom";
  const horizontalPosition = (position && position.horizontal) || "left";
  const defaultClassName =
    "absolute min-w-[200px] bg-white p-2 mt-2 shadow-lg border border-neutral-400 rounded-md overflow-hidden";
  const allClassNames = clsx(
    defaultClassName,
    className,
    menuPositions[verticalPosition],
    menuPositions[horizontalPosition]
  );

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{
            opacity: 0,
            translateY: verticalPosition === "top" ? 10 : -10,
          }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.15,
          }}
          className={allClassNames}
        >
          {children}
        </motion.div>
      ) : (
        <></>
      )}
    </AnimatePresence>
  );
};

export const MenuDivider = () => {
  return <div className="my-2 border-b border-neutral-400"></div>;
};

export const MenuItem = ({
  children,
  className,
  onClose,
  ...rest
}: TMenuItemProps) => {
  const defaultClassName =
    "flex justify-between items-center text-left font-medium px-4 py-2 rounded-md hover:bg-neutral-100 active:bg-neutral-200";
  const allClassNames = clsx(defaultClassName, className);

  if (rest.as === "a") {
    const { as, ...otherAttr } = rest;
    return (
      <div className="flex flex-col items-stretch" onClick={onClose}>
        <Link className={allClassNames} {...otherAttr}>
          {children}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-stretch" onClick={onClose}>
      <button type="button" className={allClassNames} {...rest}>
        {children}
      </button>
    </div>
  );
};
