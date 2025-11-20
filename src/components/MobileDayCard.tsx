import { hotels } from "../data/hotels";
import { meals } from "../data/meals";
import { setDinner, setHotel, setLunch } from "../redux/slices/bookingSlice";
import { useAppDispatch, useAppSelector } from "../redux/store";
import type { DailySelection } from "../types/redux";

const MobileDayCard = ({ day }: { day: DailySelection }) => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.booking.booking);
  const countryHotels = hotels[config.destination] || [];
  const countryMeals = meals[config.destination] || { lunch: [], dinner: [] };

  const HB = config.boardTypeCode === "HB";
  const NB = config.boardTypeCode === "NB";

  const startDate = new Date(config.startDate);
  const currentDate = new Date(startDate);
  currentDate.setDate(startDate.getDate() + day.dayIndex);
  const dayNum = currentDate.getDate();
  const month = currentDate.toLocaleString("en", { month: "short" });
  const year = currentDate.getFullYear();
  const dateString = `${dayNum} ${month} ${year}`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">
        Day {day.dayIndex + 1} - {dateString}
      </h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hotel</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={day.hotelId || ""}
            onChange={(e) =>
              dispatch(setHotel({ dayIndex: day.dayIndex, hotelId: Number(e.target.value) }))
            }
          >
            <option value="" disabled hidden>
              Select hotel
            </option>
            {countryHotels.map((hotel) => (
              <option key={hotel.id} value={hotel.id}>
                {hotel.name} - ${hotel.price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Lunch</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={NB || (HB && day.dinnerId !== null)}
            value={day.lunchId || ""}
            onChange={(e) =>
              dispatch(
                setLunch({ dayIndex: day.dayIndex, lunchId: Number(e.target.value) || null }),
              )
            }
          >
            <option value="" disabled hidden>
              Select lunch meal
            </option>
            {countryMeals.lunch.map((meal) => (
              <option key={meal.id} value={meal.id}>
                {meal.name} - ${meal.price}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Dinner</label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={NB || (HB && day.lunchId !== null)}
            value={day.dinnerId || ""}
            onChange={(e) =>
              dispatch(
                setDinner({ dayIndex: day.dayIndex, dinnerId: Number(e.target.value) || null }),
              )
            }
          >
            <option value="" disabled hidden>
              Select dinner meal
            </option>
            {countryMeals.dinner.map((meal) => (
              <option key={meal.id} value={meal.id}>
                {meal.name} - ${meal.price}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default MobileDayCard;
