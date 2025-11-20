import { useAppDispatch, useAppSelector } from "../redux/store";
import { countries } from "../data/countries";
import {
  setBoardTypeCode,
  setCitizenship,
  setDays,
  setDestination,
  setStartDate,
} from "../redux/slices/bookingSlice";
import { boardTypes } from "../data/boardTypes";

const BookingForm = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.booking.booking);

  console.log(config);

  return (
    <form className="p-6">
      <h1 className="text-xl mb-6 font-bold">Initial configuration</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            className="text-sm font-medium text-gray-700 mb-2 block items-center gap-2"
            htmlFor="citizenship"
          >
            Citizenship:
          </label>
          <select
            id="citizenship"
            value={config.citizenship}
            onChange={(e) => dispatch(setCitizenship(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="" disabled hidden>
              Select country
            </option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-700 mb-2 block items-center gap-2"
            htmlFor="destination"
          >
            Destination:
          </label>
          <select
            id="destination"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={config.destination}
            onChange={(e) => dispatch(setDestination(e.target.value))}
          >
            <option value="" disabled hidden>
              Select destination country
            </option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-700 mb-2 block items-center gap-2"
            htmlFor="startDate"
          >
            Start date:
          </label>
          <input
            type="date"
            id="startDate"
            value={config.startDate}
            onChange={(e) => dispatch(setStartDate(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            className="text-sm font-medium text-gray-700 mb-2 block items-center gap-2"
            htmlFor="days"
          >
            Number of days:
          </label>
          <input
            type="number"
            id="days"
            value={config.days === 0 ? "" : config.days}
            onChange={(e) => dispatch(setDays(Number(e.target.value)))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-3  items-center gap-2">
          Board type:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {boardTypes.map((type) => (
            <label
              key={type.code}
              className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                config.boardTypeCode === type.code
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
            >
              <input
                type="radio"
                name="boardType"
                value={type.code}
                checked={config.boardTypeCode === type.code}
                onChange={(e) => dispatch(setBoardTypeCode(e.target.value as "FB" | "HB" | "NB"))}
                className="w-4 h-4 text-blue-600"
              />
              <div className="ml-3">
                <div className="font-semibold text-gray-800">{type.name}</div>
                <div className="text-sm text-gray-600">
                  {type.code === "FB" && "Breakfast, Lunch & Dinner"}
                  {type.code === "HB" && "Breakfast & One Meal"}
                  {type.code === "NB" && "No Meals Included"}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
