import { setAppStatusAC } from "./app-reducer"
import { LoginType } from "features/Login/Login"
import { authAPI, FieldErrorType } from "api/api"
import { handleServerAppError, handleServerNetworkError } from "utils/handleErrorUtils"
import { clearDataAC } from "./todolist-reducer"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const login = createAsyncThunk<
  undefined,
  LoginType,
  {
    rejectValue: {
      errors: Array<string>
      fieldsErrors?: Array<FieldErrorType>
    }
  }
>("auth/login", async (param, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authAPI.login(param)
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
      return
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue({
        errors: res.data.messages,
        fieldsErrors: res.data.fieldsErrors,
      })
    }
  } catch (e) {
    handleServerNetworkError(e as Error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue({
      errors: [(e as Error).message],
      fieldsErrors: undefined,
    })
  }
})

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(clearDataAC({}))
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
      return
    } else {
      handleServerAppError(res.data, thunkAPI.dispatch)
      return thunkAPI.rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(e as Error, thunkAPI.dispatch)
    return thunkAPI.rejectWithValue(null)
  }
})

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedInAC: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state) => {
        state.isLoggedIn = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false
      })
  },
})
export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions
