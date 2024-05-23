import { authActions } from "features/Login/model/auth-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerNetworkError } from "common/utils";
import { authAPI } from "features/Login/api/loginApi";
import { ResultCode } from "common/enums";

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

export const me = createAppAsyncThunk("app/me", async (_, thunkAPI) => {
  thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === ResultCode.success) {
      thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
      thunkAPI.dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
    } else {
      thunkAPI.dispatch(appActions.setAppStatus({ status: "failed" }));
    }
  } catch (e) {
    handleServerNetworkError(e as Error, thunkAPI.dispatch);
  }
});

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialStateType = ReturnType<typeof slice.getInitialState>;

export const appReducer = slice.reducer;
export const appActions = slice.actions;
export const appThunks = { me };
