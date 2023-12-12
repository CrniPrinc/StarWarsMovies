import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
  name: "snackbar",
  initialState: {
    open: false,
    message: "",
  },
  reducers: {
    showSnackbar: (state, action) => {
      state.open = true;
      state.message = action.payload.message;
    },
    hideSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const snackBarActions = snackBarSlice.actions;

export default snackBarSlice;
