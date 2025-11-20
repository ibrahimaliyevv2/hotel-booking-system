import { createSlice } from "@reduxjs/toolkit";

const initialState: { currentStep: number } = {
  currentStep: 1,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    reset: () => initialState,
  },
});

export const {nextStep, reset} = stepSlice.actions;
export default stepSlice.reducer;