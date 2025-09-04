import { configureStore } from "@reduxjs/toolkit";

import general from "./slices/general";


export const makeStore = () =>
  configureStore({
    reducer: {
      general,
    },
  });

export type RootState = ReturnType<ReturnType<typeof makeStore>["getState"]>;
export type AppDispath = ReturnType<typeof makeStore>["dispatch"];
