import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/store";
import { generateDays } from "../redux/slices/bookingSlice";
import DayRow from "./DayRow";
import MobileDayCard from "./MobileDayCard";

const DailyConfiguration = () => {
  const dispatch = useAppDispatch();
  const dailySelections = useAppSelector((state) => state.booking.dailySelections);
  const booking = useAppSelector((state) => state.booking.booking);

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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {dailySelections.map((day) => (
          <MobileDayCard key={day.dayIndex} day={day} />
        ))}
      </div>
    </div>
  );
};

export default DailyConfiguration;
