import { AppRootStateType } from "../state/store";
import { RequestStatusType } from "./app-reducer";

export const appStatusSelector = (state: AppRootStateType): RequestStatusType =>
  state.app.status;

export const isInitializedSelector = (state: AppRootStateType): boolean =>
  state.app.isInitialized;
