import { weekDays } from "../helpers/utils";

const CalendarDatePicker: React.FC = () => {
  return (
    <>
      <div className="flex justify-evenly">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center font-bold">
            {day}
          </div>
        ))}
      </div>
    </>
  );
};

export default CalendarDatePicker;
