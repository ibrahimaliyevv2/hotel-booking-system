import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Booking, DailySelection } from "../../types/redux";

const initialState: {
  booking: Booking;
  dailySelections: DailySelection[];
} = {
  booking: {
    citizenship: "",
    startDate: "",
    days: 0,
    destination: "",
    boardTypeCode: "NB",
  },
  dailySelections: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setCitizenship: (state, action: PayloadAction<string>) => {
      state.booking.citizenship = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string>) => {
      state.booking.startDate = action.payload;
    },
    setDays: (state, action: PayloadAction<number>) => {
      state.booking.days = action.payload;
    },
    setDestination: (state, action: PayloadAction<string>) => {
      state.booking.destination = action.payload;
    },
    setBoardTypeCode: (state, action: PayloadAction<"FB" | "HB" | "NB">) => {
      state.booking.boardTypeCode = action.payload;
    },
  },
});

export const { setCitizenship, setStartDate, setDays, setDestination, setBoardTypeCode } =
  bookingSlice.actions;

export default bookingSlice.reducer;
