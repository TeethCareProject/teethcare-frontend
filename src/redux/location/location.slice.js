import { createSlice } from "@reduxjs/toolkit";

const provinceSlice = createSlice({
  name: "provinces",
  initialState: {
    clinics: JSON.parse(localStorage.getItem("provinces")) || {},
  },
  reducers: {
    setProvinces: (state, action) => {
      return {
        ...state,
        provinces: action.payload,
      };
    },
  },
});

export const provinceActions = provinceSlice.actions;
export default provinceSlice.reducer;
