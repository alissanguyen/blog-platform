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
  placeholder?: string;
  description?: string;
  error?: string;
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
  label,
  placeholder = "Select option",
  description,
  error,
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
  const defaultClassName = "flex flex-col items-stretch";
  const allClassNames = clsx(defaultClassName, className);
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

  return (
    <div className={allClassNames} ref={ref}>
      <div
        className="mb-1 text-body-sm font-semibold"
        onClick={() => setOpen(true)}
      >
        {label}
      </div>
      <div className="relative">
        <div
          className={clsx(
            "cursor-pointer rounded-lg border outline-none ring-4",
            error
              ? open
                ? "border-red-700 ring-red-100"
                : "border-red-700 ring-transparent"
              : open
              ? "border-primary-300 ring-primary-100"
              : "border-neutral-400 ring-transparent"
          )}
          tabIndex={0}
          onFocus={() => setOpen(true)}
          onClick={() => setOpen(true)}
        >
          {searchable ? (
            <div className="relative flex items-center">
              {!searchTerm && (
                <span className="absolute left-3.5 line-clamp-1">
                  {multiselect ? (
                    multipleOptionsSelected.length ? (
                      `${multipleOptionsSelected.length} item${
                        multipleOptionsSelected.length > 1 ? "s" : ""
                      } selected`
                    ) : (
                      <span className="text-neutral-600">{placeholder}</span>
                    )
                  ) : childSelected ? (
                    childSelected.props.children
                  ) : (
                    <span className="text-neutral-600">{placeholder}</span>
                  )}
                </span>
              )}
              <input
                type="text"
                className="w-full rounded-lg border-none py-2 pl-3.5 pr-7 outline-none"
                onChange={handleSearchOptions}
                value={searchTerm}
              />
              <span
                className={clsx(
                  "pointer-events-none absolute right-2 top-1/2 -translate-y-1/2",
                  error && "text-red-700"
                )}
              >
                {open ? <MagnifyingGlass size={16} /> : <CaretDown size={16} />}
              </span>
            </div>
          ) : (
            <div className="flex items-center py-2 pl-3.5 pr-2">
              <span className="pointer-events-none line-clamp-1">
                {multiselect ? (
                  multipleOptionsSelected.length ? (
                    `${multipleOptionsSelected.length} item${
                      multipleOptionsSelected.length > 1 ? "s" : ""
                    } selected`
                  ) : (
                    <span className="text-neutral-600">{placeholder}</span>
                  )
                ) : childSelected ? (
                  childSelected.props.children
                ) : (
                  <span className="text-neutral-600">{placeholder}</span>
                )}
              </span>
              <span className="pointer-events-none invisible w-px select-none whitespace-nowrap opacity-0">
                {label}
              </span>
              <span
                className={clsx(
                  "ml-auto inline-block pl-1 transition-transform duration-200",
                  open && "rotate-x-180",
                  error && "text-red-700"
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
                      ? multipleOptionsSelected.some(
                          (option) => option === value
                        )
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
      {description && (
        <p className="mt-1 text-body-sm text-neutral-600">{description}</p>
      )}
      {error && <p className="mt-1 text-body-sm text-red-700">{error}</p>}
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

  console.log(checked);

  return (
    <li
      className={clsx(
        "cursor-pointer transition-colors duration-200 hover:bg-neutral-100 active:bg-neutral-200",
        selected && "bg-primary-50 text-primary-600 hover:bg-primary-50"
      )}
      onMouseUp={() => onChange && onChange(value)}
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
