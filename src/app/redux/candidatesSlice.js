import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {
    addCandidate: (state, action) => {
      const newCandidate = { id: Date.now().toString(), ...action.payload };
      state.push(newCandidate);
    },
  },
});

export const { addCandidate } = candidatesSlice.actions;
export default candidatesSlice.reducer;
