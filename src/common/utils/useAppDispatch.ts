import { useDispatch } from "react-redux";
import { AppRootStateType } from "../../state/store";
import { ThunkDispatch } from "redux-thunk";
import { UnknownAction } from "@reduxjs/toolkit";

export type AppDispatchType = ThunkDispatch<
  AppRootStateType,
  unknown,
  UnknownAction
>;

export const useAppDispatch = useDispatch<AppDispatchType>;
