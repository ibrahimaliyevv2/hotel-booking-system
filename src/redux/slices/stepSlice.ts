import { createSlice } from "@reduxjs/toolkit";

const initialState: { currentStep: number; isLoading: boolean } = {
  currentStep: 1,
  isLoading: false,
};

const stepSlice = createSlice({
  name: "step",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    resetStep: () => initialState,
  },
});

export const {nextStep, setLoading, resetStep} = stepSlice.actions;
export default stepSlice.reducer;