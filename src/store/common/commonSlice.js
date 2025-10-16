import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cms: {},
  footerData: null,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  //   reducer needs a map
  reducers: {
    setCMSData: (state, action) => {
      state.cms = action.payload;
    },
    setFooterData: (state, action) => {
      state.footerData = action.payload;
    },
  },
});

export const { setCMSData, setFooterData } = commonSlice.actions;

export default commonSlice.reducer;
