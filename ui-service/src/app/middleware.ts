import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import { showToast } from "src/modules/toast/toastSlice";

export const apiErrorMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      const message =
        "An error occurred, please try again. If the problem persists, contact support.";
      const error =
        "data" in action.error
          ? (action.error.data as { message: string }).message
          : action.error.message;
      console.warn("API error:", error ?? message);
      api.dispatch(showToast({ message, severity: "error" }));
    }
    return next(action);
  };
