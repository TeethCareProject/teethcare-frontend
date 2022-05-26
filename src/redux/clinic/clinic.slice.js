import { createSlice } from "@reduxjs/toolkit";

const clinicSlice = createSlice({
  name: "clinics",
  initialState: {
    clinics: JSON.parse(localStorage.getItem("clinics")) || {},
  },
  reducers: {
    setClinics: (state, action) => {
      return {
        ...state,
        clinics: action.payload,
      };
    },
  },
});

export const clinicActions = clinicSlice.actions;
export default clinicSlice.reducer;
