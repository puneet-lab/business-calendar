import { Dayjs } from "dayjs";
import { generateMonthMatrix, weekDays } from "../helpers/utils";

interface CalendarDatePickerProps {
  currentMonth: Dayjs;
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  currentMonth,
}) => {
  const renderMatrix = (): JSX.Element[] => {
    const matrix = generateMonthMatrix(currentMonth);

    return matrix.map((week, weekIndex) => (
      <div key={weekIndex} className="flex justify-evenly">
        {week.map((day, dayIndex) => {
          return <div key={dayIndex}>{day && day.format("D")}</div>;
        })}
      </div>
    ));
  };
  return (
    <>
      <div className="flex justify-evenly">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
      {renderMatrix()}
    </>
  );
};

export default CalendarDatePicker;
