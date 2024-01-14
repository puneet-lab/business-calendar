import React, { useState } from "react";

interface DropdownProps {
  options: string[] | number[];
  onSelect: (value: string | number) => void;
  defaultLabel: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  onSelect,
  defaultLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string | number) => {
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        className="bg-gray-200 rounded px-4 py-2 hover:bg-gray-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {defaultLabel}
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 rounded bg-white shadow-lg z-10 max-h-80 overflow-auto">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
