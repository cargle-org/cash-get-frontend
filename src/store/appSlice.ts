import { AnyAction, combineReducers, createSlice, PayloadAction, Reducer } from "@reduxjs/toolkit";
import storage from "redux-persist/es/storage";
import { authSlice } from "./authSlice";
import { authApi } from "../services/auth.service";

const appSlice = createSlice({
  name: "app",
  initialState: {
    id: Math.random() * 1000,
    v1: {},
    activeAccountMenu: "Spending",
    hasEarlyPayModalBeenOpen: false,
  } as {
    id: number;
    v1: object;
    activeAccountMenu: "Spending" | "Linked";
    hasEarlyPayModalBeenOpen: boolean;
  },
  reducers: {
    changeAccountType: (state, { payload: { activeAccountMenu } }: PayloadAction<{ activeAccountMenu: "Spending" | "Linked" }>) => {
      state.activeAccountMenu = activeAccountMenu;
    },
    changeEarlyPayModalBeenOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.hasEarlyPayModalBeenOpen = payload;
    },
    clearStore() {},
  },
});

export const { clearStore, changeAccountType, changeEarlyPayModalBeenOpen } = appSlice.actions;

const reducers = combineReducers({
  auth: authSlice.reducer,
  app: appSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

export const combinedMiddleware = [authApi.middleware];

export const rootReducer: Reducer = (state: ReturnType<typeof reducers>, action: AnyAction) => {
  if (action.type === "app/clearStore") {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem("persist:root");
    // eslint-disable-next-line no-param-reassign
    state = {} as ReturnType<typeof reducers>;
  }
  return reducers(state, action);
};

export type RootState = ReturnType<typeof reducers>;
