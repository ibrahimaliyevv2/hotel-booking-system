import { useAppDispatch, useAppSelector } from "../redux/store";
import { countries } from "../data/countries";
import { setCitizenship } from "../redux/slices/bookingSlice";
const BookingForm = () => {
  const dispatch = useAppDispatch();
  const config = useAppSelector((state) => state.booking.booking);
  return (
    <form>
      <h1>Booking configuration</h1>

      <div>
        <div>
          <label>Citizenship:</label>
          <select
            value={config.citizenship}
            onChange={(e) => dispatch(setCitizenship(e.target.value))}
            className="border p-2 w-full"
          >
            <option value="">Select country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </form>
  );
};

export default BookingForm;
