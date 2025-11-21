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

      state.dailySelections = state.dailySelections.map((day) => ({
        ...day,
        lunchId: null,
        dinnerId: null,
      }));
    },
    generateDays: (state) => {
      state.dailySelections = Array.from({ length: state.booking.days }, (_, i) => ({
        dayIndex: i,
        hotelId: null,
        lunchId: null,
        dinnerId: null,
      }));
    },
    setHotel: (state, action: PayloadAction<{ dayIndex: number; hotelId: number }>) => {
      const day = state.dailySelections[action.payload.dayIndex];
      if (day) day.hotelId = action.payload.hotelId;
    },
    setLunch: (state, action: PayloadAction<{ dayIndex: number; lunchId: number | null }>) => {
      const day = state.dailySelections[action.payload.dayIndex];
      if (!day) return;
      day.lunchId = action.payload.lunchId;

      if (state.booking.boardTypeCode === "HB" && action.payload.lunchId !== null) {
        day.dinnerId = null;
      }
    },
    setDinner: (state, action: PayloadAction<{ dayIndex: number; dinnerId: number | null }>) => {
      const day = state.dailySelections[action.payload.dayIndex];
      if (!day) return;
      day.dinnerId = action.payload.dinnerId;

      if (state.booking.boardTypeCode === "HB" && action.payload.dinnerId !== null) {
        day.lunchId = null;
      }
    },
    resetBooking: () => initialState
  },
});

export const {
  setCitizenship,
  setStartDate,
  setDays,
  setDestination,
  setBoardTypeCode,
  generateDays,
  setHotel,
  setLunch,
  setDinner,
  resetBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;
