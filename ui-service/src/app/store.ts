import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiErrorMiddleware } from "src/app/middleware";
import { dispatchesApiSlice } from "src/modules/dispatchService/dispatchesApiSlice";
import { jobsApiSlice } from "src/modules/jobService/jobsApiSlice";
import { techniciansApiSlice } from "src/modules/techService/techniciansApiSlice";
import { toastSlice } from "src/modules/toast/toastSlice";

const rootReducer = combineSlices(
  dispatchesApiSlice,
  jobsApiSlice,
  techniciansApiSlice,
  toastSlice,
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(dispatchesApiSlice.middleware)
        .concat(jobsApiSlice.middleware)
        .concat(techniciansApiSlice.middleware)
        .concat(apiErrorMiddleware);
    },
    preloadedState,
  });
  setupListeners(store.dispatch);
  return store;
};

export const store = makeStore();

export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
