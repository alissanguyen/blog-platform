import { useRef, useState, ReactChild, ReactChildren, useEffect } from "react";
import clsx from "clsx";
import { CaretDown, MagnifyingGlass } from "phosphor-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDebounce, useOnClickOutside, useToggle } from "~/hooks";
import NoSearchResult from "~/public/images/NoSearchResult.png";
import { Checkbox } from "../Checkbox";

type TSelectProps = {
  children: ReactChild[] | ReactChildren[];
  defaultValue?: string;
  label?: string;
  maxHeight?: number;
  searchable?: boolean;
  multiselect?: boolean;
  className?: string;
  onChange: (value: string | string[]) => void;
};

type TOptionProps = {
  value: string;
  children: string;
  selected?: boolean;
  multiselect?: boolean;
  onChange?: (value: string | string[]) => void;
};

export const Select = ({
  children,
  defaultValue = "",
  label = "Select option",
  maxHeight = 250,
  searchable = false,
  multiselect = false,
  className,
  onChange,
}: TSelectProps) => {
  const [options, setOptions] = useState(children);
  const [optionSelected, setOptionSelected] = useState<string>(defaultValue);
  const [multipleOptionsSelected, setMultipleOptionsSelected] = useState<
    string[]
  >(defaultValue ? [defaultValue] : []);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef(null);
  const defaultClassName = "cursor-pointer border ring-1 rounded";
  const allClassNames = clsx(
    defaultClassName,
    open
      ? "border-blue-500 ring-blue-500"
      : "border-neutral-500 ring-transparent",
    className
  );
  const childSelected = (children as any).find(
    ({ props: { value } }: any) => value === optionSelected
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 200);
  const notFound = searchable && debouncedSearchTerm && !options.length;

  const handleClickOutside = () => {
    setOpen(false);
    setSearchTerm("");
  };

  useOnClickOutside(ref, handleClickOutside);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const filteredOptions = (children as any).filter(
        ({ props: { children } }: any) =>
          children.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setOptions(filteredOptions);
    } else {
      setOptions(children);
    }
  }, [debouncedSearchTerm]);

  const handleChange = (value: string | string[]) => {
    if (multiselect) {
      const valueSelected = multipleOptionsSelected.some(
        (option) => option === value
      );
      const newValue = valueSelected
        ? multipleOptionsSelected.filter((option) => option !== value)
        : [...multipleOptionsSelected, value];

      setMultipleOptionsSelected(newValue as string[]);
      onChange(newValue as string[]);
    } else {
      setOptionSelected(value as string);
      onChange(value);
      setOpen(false);
      setSearchTerm("");
    }
  };

  const handleSearchOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  console.log(open || optionSelected || multipleOptionsSelected.length);

  return (
    <div className="relative" ref={ref}>
      <div className={allClassNames} tabIndex={0} onFocus={() => setOpen(true)}>
        {searchable ? (
          <div className="relative flex items-center">
            <span
              className={clsx(
                "absolute left-3.5 bg-white px-1 text-neutral-600 transition-all duration-150",
                (open || optionSelected || multipleOptionsSelected.length) &&
                  "text-caption text-neutral-800"
              )}
              style={
                open || optionSelected || multipleOptionsSelected.length
                  ? {
                      transform: `translate(-4px, -${
                        (ref.current as any).offsetHeight / 2 - 2
                      }px)`,
                    }
                  : {}
              }
            >
              {label}
            </span>
            {!searchTerm && (
              <span className="absolute left-3.5 line-clamp-1">
                {childSelected && childSelected.props.children}
                {multiselect && multipleOptionsSelected.length
                  ? `${multipleOptionsSelected.length} item${
                      multipleOptionsSelected.length > 1 ? "s" : ""
                    } selected`
                  : null}
              </span>
            )}
            <input
              type="text"
              className="w-full rounded border-none py-2 pl-3.5 pr-7 outline-none"
              onChange={handleSearchOptions}
              value={searchTerm}
            />
            <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
              {open ? <MagnifyingGlass size={16} /> : <CaretDown size={16} />}
            </span>
          </div>
        ) : (
          <div className="flex items-center py-2 pl-3.5 pr-2">
            <span
              className={clsx(
                "bg-white px-1 text-neutral-600 transition-all duration-150",
                (open || optionSelected || multipleOptionsSelected.length) &&
                  "absolute text-caption text-neutral-800"
              )}
              style={
                open || optionSelected || multipleOptionsSelected.length
                  ? {
                      transform: `translate(-4px, -${
                        (ref.current as any).offsetHeight / 2 - 2
                      }px)`,
                    }
                  : {}
              }
            >
              {label}
            </span>
            <span className="line-clamp-1">
              {childSelected && childSelected.props.children}
              {multiselect && multipleOptionsSelected.length
                ? `${multipleOptionsSelected.length} item${
                    multipleOptionsSelected.length > 1 ? "s" : ""
                  } selected`
                : null}
            </span>
            <span className="pointer-events-none invisible w-px select-none whitespace-nowrap opacity-0">
              {label}
            </span>
            <span
              className={clsx(
                "ml-auto inline-block pl-1 transition-transform duration-200",
                open && "rotate-x-180"
              )}
            >
              <CaretDown size={16} />
            </span>
          </div>
        )}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
            className="absolute top-full z-dropdown mt-1.5 flex w-full flex-col items-stretch rounded-md border border-neutral-300 bg-white shadow-md"
          >
            <div>
              <ul
                className="overflow-auto"
                style={{ maxHeight: `${maxHeight}px` }}
              >
                {options.map(({ props: { value, children } }: any) => {
                  const selected = multiselect
                    ? multipleOptionsSelected.some((option) => option === value)
                    : value === optionSelected;

                  return (
                    <Option
                      key={value}
                      value={value}
                      selected={selected}
                      multiselect={multiselect}
                      onChange={handleChange}
                    >
                      {children}
                    </Option>
                  );
                })}
                {notFound && (
                  <li className="flex flex-col items-center px-3.5 py-2">
                    <img
                      src={NoSearchResult}
                      className="-mb-2 -mt-3"
                      width={90}
                      alt="no search result"
                    />
                    <p>No option found</p>
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Option = ({
  value,
  children,
  selected,
  multiselect,
  onChange,
}: TOptionProps) => {
  const [checked, toggle] = useToggle(selected);

  return (
    <li
      className={clsx(
        "cursor-pointer transition-colors duration-200 hover:bg-indigo-50 hover:text-blue-700 active:bg-indigo-100",
        selected && "bg-indigo-50 text-blue-700"
      )}
      onMouseDown={() => onChange && onChange(value)}
    >
      {multiselect ? (
        <Checkbox
          containerClassName="w-full px-3.5 py-2"
          checked={checked}
          onChange={toggle}
          label={children}
        />
      ) : (
        <div className="px-3.5 py-2">{children}</div>
      )}
    </li>
  );
};
