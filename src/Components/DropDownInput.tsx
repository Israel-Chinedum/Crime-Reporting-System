import { FaChevronDown } from "react-icons/fa";
import { cn } from "../utilities/classNames";
import { useEffect, useState } from "react";

export const DropDownInput = ({
  arr,
  placeholder,
  defaultValue,
  name,
}: {
  arr: string[];
  placeholder: string;
  defaultValue?: string;
  name: string;
}) => {
  const [drop, setDrop] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  return (
    <div className={cn("relative")}>
      <div className={cn("relative")}>
        <input
          type="text"
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={name}
          placeholder={placeholder}
          className={cn("p-3 w-full outline-none bg-deep rounded-md")}
        />
        <FaChevronDown
          className={cn(
            "absolute top-[50%] left-full translate-y-[-50%] translate-x-[-150%]",
            "cursor-pointer",
          )}
          onClick={() => {
            if (drop) {
              setDrop(false);
            } else {
              setDrop(true);
            }
          }}
        />
      </div>
      <ul
        className={cn(
          "bg-gray-900 overflow-hidden h-0",
          "absolute w-full z-10",
          drop && "h-max shadow-2xl",
        )}
      >
        {arr.map((value, index) => (
          <li
            key={`${index}${value}`}
            onClick={() => {
              setDrop(false);
              setValue(value);
            }}
            className={cn("p-2 hover:bg-custom-blue")}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
