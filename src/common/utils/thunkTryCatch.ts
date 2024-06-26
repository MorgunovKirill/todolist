import { appActions } from "../../app/model/app-reducer";
import { handleServerNetworkError } from "./handleServerNetworkError";
import { AppDispatchType } from "./useAppDispatch";
import { BaseResponseType } from "../types";
import { AppRootStateType } from "../../state/store";
import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<
    AppRootStateType,
    unknown,
    AppDispatchType,
    null | BaseResponseType
  >,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e as Error, dispatch);
    return rejectWithValue(null);
  }
};
