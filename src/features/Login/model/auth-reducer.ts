import { appActions } from "app/model/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { authAPI } from "features/Login/api/loginApi";
import { ResultCode } from "common/enums";
import { LoginType } from "features/Login/api/loginApi.types";
import { clearData } from "common/actions/common.actions";
import { thunkTryCatch } from "../../../common/utils/thunkTryCatch";

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

export const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>(
  `${slice.name}/login`,
  async (param, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.login(param);
      if (res.data.resultCode === ResultCode.success) {
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: true };
      } else {
        const isShowAppError = !res.data.fieldsErrors.length;
        handleServerAppError(res.data, thunkAPI.dispatch, isShowAppError);
        return thunkAPI.rejectWithValue({
          resultCode: 1,
          data: {},
          messages: res.data.messages,
          fieldsErrors: res.data.fieldsErrors,
        });
      }
    });
  },
);

export const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authAPI.logout();
      if (res.data.resultCode === ResultCode.success) {
        thunkAPI.dispatch(clearData());
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { isLoggedIn: false };
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    });
  },
);
export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout };
