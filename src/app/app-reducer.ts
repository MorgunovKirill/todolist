import { authActions } from "features/Login/model/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { authAPI } from "features/Login/api/loginApi";
import { ResultCode } from "common/enums";
import { thunkTryCatch } from "../common/utils/thunkTryCatch";

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (
      state,
      action: PayloadAction<{ status: RequestStatusType }>,
    ) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state) => {
      state.isInitialized = true;
    });
  },
});

export const me = createAppAsyncThunk(
  `${slice.name}/me`,
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.me();
      if (res.data.resultCode === ResultCode.success) {
        thunkAPI.dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch, false);
      }
    });
  },
);

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = ReturnType<typeof slice.getInitialState>;

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { me };
