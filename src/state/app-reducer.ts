import { Dispatch } from "redux"
import { authAPI } from "api/api"
import { handleServerNetworkError } from "utils/handleErrorUtils"
import { setIsLoggedInAC } from "state/auth-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setIsInitializedAC: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
    setAppStatusAC: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppErrorAC: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error
    },
  },
})

export const meTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      dispatch(setAppStatusAC({ status: "failed" }))
    }
  } catch (e) {
    handleServerNetworkError(e as Error, dispatch)
  } finally {
    dispatch(setIsInitializedAC({ isInitialized: true }))
  }
}

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InitialStateType = ReturnType<typeof slice.getInitialState>

export const appReducer = slice.reducer
export const { setIsInitializedAC, setAppStatusAC, setAppErrorAC } = slice.actions

export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>
