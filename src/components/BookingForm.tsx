import { useAppDispatch, useAppSelector } from "../redux/store";
import { countries } from "../data/countries";
import {
  generateDays,
  setBoardTypeCode,
  setCitizenship,
  setDays,
  setDestination,
  setStartDate,
} from "../redux/slices/bookingSlice";
import { boardTypes } from "../data/boardTypes";
import { useState } from "react";
import { nextStep } from "../redux/slices/stepSlice";

const BookingForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.booking.booking);
  const [errors, setErrors] = useState<Record<string, string>>();

  const currentStep = useAppSelector((state) => state.step.currentStep);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!config.citizenship) newErrors.citizenship = "Please select citizenship.";
    if (!config.destination) newErrors.destination = "Please select destination country.";
    if (!config.startDate) newErrors.startDate = "Please select start date.";
    if (config.days < 1) {
      newErrors.days = "Days to stay should be greater than 0.";
    }
    if (!config.boardTypeCode) newErrors.boardTypeCode = "Please select board type.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(config);
    if (validateForm()) {
      dispatch(generateDays());
      dispatch(nextStep());
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <form className="p-6" onSubmit={handleSubmit}>
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
            value={config.citizenship ?? ""}
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
          {errors?.citizenship && (
            <p className="text-red-500 text-sm mt-1">{errors?.citizenship}</p>
          )}
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
            value={config.destination ?? ""}
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
          {errors?.destination && <p className="text-red-500 text-sm mt-1">{errors.destination}</p>}
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
            min={today}
            value={config.startDate}
            onChange={(e) => dispatch(setStartDate(e.target.value))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors?.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
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
            min={1}
            value={config.days === 0 ? "" : config.days}
            onChange={(e) => dispatch(setDays(Number(e.target.value)))}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors?.days && <p className="text-red-500 text-sm mt-1">{errors.days}</p>}
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
        {errors?.boardTypeCode && (
          <p className="text-red-500 text-sm mt-1">{errors.boardTypeCode}</p>
        )}
      </div>
      {currentStep === 1 && (
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl 
               hover:bg-blue-700 transition"
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
};

export default BookingForm;
