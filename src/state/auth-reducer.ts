import { Dispatch } from "redux"
import { setAppStatusAC } from "./app-reducer"
import { LoginType } from "features/Login/Login"
import { authAPI, FieldErrorType } from "api/api"
import { handleServerAppError, handleServerNetworkError } from "utils/handleErrorUtils"
import { clearDataAC } from "./todolist-reducer"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const login = createAsyncThunk<
  { isLoggedIn: boolean },
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
      return { isLoggedIn: true }
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

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ isLoggedIn: false }))
      dispatch(clearDataAC({}))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as Error, dispatch)
  }
}

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
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
  },
})
export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions
