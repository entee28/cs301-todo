import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { store } from "./store";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: null,
    userId: null,
  } as AppSliceState,
  reducers: {
    updateAppData: (state, action: PayloadAction<Partial<AppSliceState>>) => {
      return merge(state, action.payload);
    },
    clearUser: () => {
      console.log("isCalled");
      return {
        token: null,
        userId: null,
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
