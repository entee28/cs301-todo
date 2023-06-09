import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { store } from "./store";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: null,
    userId: null,
    tasks: [],
  } as AppSliceState,
  reducers: {
    updateAppData: (state, action: PayloadAction<Partial<AppSliceState>>) => {
      return merge(state, action.payload);
    },
    clearUser: () => {
      return {
        token: null,
        userId: null,
        tasks: [],
      };
    },
  },
});

export const { updateAppData, clearUser } = appSlice.actions;
export const appReducer = appSlice.reducer;
export const logout = () => {
  store.dispatch(clearUser());

  setTimeout(() => {
    window.location.replace(import.meta.env.VITE_COGNITO_LOGOUT_ENDPOINT);
  }, 1000);
};
