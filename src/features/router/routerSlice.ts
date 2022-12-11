import { createSlice } from "@reduxjs/toolkit";
import { ERoutes } from "../../const/types";

export interface IRouterState {
  route: ERoutes;
}

const initialState: IRouterState = {
  route: window.location.pathname as ERoutes,
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {},
});

export default routerSlice.reducer;
