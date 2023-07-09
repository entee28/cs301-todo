import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { store } from "./store";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: null,
    userId: null,
    tasks: [],
    groups: [],
    currentlySelectedGroup: null,
  } as AppSliceState,
  reducers: {
    updateAppData: (state, action: PayloadAction<Partial<AppSliceState>>) => {
      return merge(state, action.payload);
    },
    updateSliceTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    updateSliceGroup: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    clearUser: () => {
      return {
        token: null,
        userId: null,
        tasks: [],
        groups: [],
        currentlySelectedGroup: null,
      };
    },
  },
});

export const { updateAppData, clearUser, updateSliceTasks, updateSliceGroup } =
  appSlice.actions;
export const appReducer = appSlice.reducer;
export const logout = () => {
  store.dispatch(clearUser());

  setTimeout(() => {
    window.location.replace(import.meta.env.VITE_COGNITO_LOGOUT_ENDPOINT);
  }, 1000);
};
