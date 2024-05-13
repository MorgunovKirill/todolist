import { Dispatch } from "redux"
import { authAPI } from "api/api"
import { handleServerNetworkError } from "utils/handleErrorUtils"
import { setIsLoggedInAC } from "state/auth-reducer"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const me = createAsyncThunk("app/me", async (_, thunkAPI) => {
  thunkAPI.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      thunkAPI.dispatch(setAppStatusAC({ status: "succeeded" }))
      thunkAPI.dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    } else {
      thunkAPI.dispatch(setAppStatusAC({ status: "failed" }))
    }
  } catch (e) {
    handleServerNetworkError(e as Error, thunkAPI.dispatch)
  }
})

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppErrorAC: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state) => {
      state.isInitialized = true
    })
  },
})

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = ReturnType<typeof slice.getInitialState>

export const appReducer = slice.reducer
export const { setAppStatusAC, setAppErrorAC } = slice.actions

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
