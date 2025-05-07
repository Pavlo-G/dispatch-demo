import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type ToastState = {
  message?: string;
  severity?: "error" | "info" | "success" | "warning";
};

const initialState: ToastState = {
  severity: "info",
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        severity: ToastState["severity"];
      }>,
    ) => {
      state.message = action.payload.message;
      state.severity = action.payload.severity ?? "info";
    },
    clearToast: (state) => {
      state.message = undefined;
    },
  },
});

export const { showToast, clearToast } = toastSlice.actions;
export default toastSlice.reducer;
