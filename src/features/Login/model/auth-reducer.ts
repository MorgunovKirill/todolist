import { appActions } from "state/app-reducer";
import { handleServerNetworkError } from "common/utils/handleServerNetworkError";
import { todolistsActions } from "state/todolist-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk, handleServerAppError } from "common/utils";
import { authAPI } from "features/Login/api/loginApi";
import { ResultCode } from "common/enums";
import { FieldErrorType } from "common/types";
import { LoginType } from "features/Login/api/loginApi.types";

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
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export const login = createAppAsyncThunk<
  undefined,
  LoginType,
  {
    rejectValue: {
      errors: Array<string>;
      fieldsErrors?: Array<FieldErrorType>;
    };
  }
>("auth/login", async (param, thunkAPI) => {
  thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }));
  try {
    const res = await authAPI.login(param);
    if (res.data.resultCode === ResultCode.success) {
      thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return;
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue({
        errors: res.data.messages,
        fieldsErrors: res.data.fieldsErrors,
      });
    }
  } catch (e) {
    handleServerNetworkError(e as Error, thunkAPI.dispatch);
    return thunkAPI.rejectWithValue({
      errors: [(e as Error).message],
      fieldsErrors: undefined,
    });
  }
});

export const logout = createAppAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await authAPI.logout();
      if (res.data.resultCode === ResultCode.success) {
        thunkAPI.dispatch(todolistsActions.clearData({}));
        thunkAPI.dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return;
      } else {
        handleServerAppError(res.data, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e as Error, thunkAPI.dispatch);
      return thunkAPI.rejectWithValue(null);
    }
  },
);
export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { login, logout };
