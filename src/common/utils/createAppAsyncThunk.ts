import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppRootStateType } from "../../state/store";
import { AppDispatchType } from "./useAppDispatch";
import { BaseResponseType } from "../types";
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatchType;
  rejectValue: null | BaseResponseType;
}>();
