import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { generateDays } from "../redux/slices/bookingSlice";
import DayRow from "./DayRow";
import MobileDayCard from "./MobileDayCard";
import { nextStep } from "../redux/slices/stepSlice";

const DailyConfiguration: React.FC = () => {
  const dispatch = useAppDispatch();
  const dailySelections = useAppSelector((state) => state.booking.dailySelections);
  const booking = useAppSelector((state) => state.booking.booking);

  const currentStep = useAppSelector((state) => state.step.currentStep);

  const handleNextButton = () => {
    dispatch(nextStep());
  };

  useEffect(() => {
    if (dailySelections.length !== booking.days) {
      dispatch(generateDays());
    }
  }, [booking.days, dailySelections.length, dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-xl mb-6 font-bold">Daily configuration</h1>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Day
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Hotel
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Lunch
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                Dinner
              </th>
            </tr>
          </thead>
          <tbody>
            {dailySelections.map((day) => (
              <DayRow key={day.dayIndex} day={day} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4">
        {dailySelections.map((day) => (
          <MobileDayCard key={day.dayIndex} day={day} />
        ))}
      </div>
      {currentStep === 2 && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNextButton}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl 
               hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DailyConfiguration;
