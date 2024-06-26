import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "common/utils";
import { authAPI } from "features/Login/api/loginApi";
import { ResultCode } from "common/enums";
import { LoginType } from "features/Login/api/loginApi.types";
import { clearData } from "common/actions/common.actions";

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
    builder.addMatcher(
      isAnyOf(login.fulfilled, logout.fulfilled),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    );
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginType>(
  `${slice.name}/login`,
  async (param, thunkAPI) => {
    const res = await authAPI.login(param);
    if (res.data.resultCode === ResultCode.success) {
      return { isLoggedIn: true };
    } else {
      return thunkAPI.rejectWithValue({
        resultCode: 1,
        data: {},
        messages: res.data.messages,
        fieldsErrors: res.data.fieldsErrors,
      });
    }
  },
);

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  `${slice.name}/logout`,
  async (_, thunkAPI) => {
    const res = await authAPI.logout();
    if (res.data.resultCode === ResultCode.success) {
      thunkAPI.dispatch(clearData());
      return { isLoggedIn: false };
    } else {
      return thunkAPI.rejectWithValue(null);
    }
  },
);
export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout };
