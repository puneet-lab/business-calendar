import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import {
  RangeType,
  calculateActiveButtonType,
  setRangeBasedOnType,
} from "../helpers/utils";

interface CalendarFooterProps {
  onSelectRange: (start: Dayjs, end: Dayjs) => void;
  selectedRange: { start: Dayjs | null; end: Dayjs | null };
}

interface RangeButtons {
  type: RangeType;
  label: string;
}
[];

const rangeButtons: RangeButtons[] = [
  {
    type: RangeType.Last7D,
    label: "Last 7 Days",
  },
  {
    type: RangeType.Last30D,
    label: "Last 30 Days",
  },
  {
    type: RangeType._7D,
    label: "7 Days",
  },
  {
    type: RangeType._30D,
    label: "30 Days",
  },
];

const CalendarFooter: React.FC<CalendarFooterProps> = ({
  onSelectRange,
  selectedRange,
}) => {
  const [activeButton, setActiveButton] = useState<string>("");

  useEffect(() => {
    const activeType = calculateActiveButtonType(selectedRange);
    setActiveButton(activeType);
  }, [selectedRange]);

  const selectRange = (type: RangeType) => {
    const { start, end } = setRangeBasedOnType(type);
    onSelectRange(start, end);
    setActiveButton(type);
  };

  const getButtonClass = (type: RangeType) =>
    `px-4 py-2 rounded hover:bg-blue-600 ${
      type === activeButton ? "bg-blue-500 text-white" : "bg-gray-200"
    }`;

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {rangeButtons.map(({ type, label }) => (
        <button
          key={type}
          onClick={() => selectRange(type)}
          className={getButtonClass(type)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
export default CalendarFooter;
