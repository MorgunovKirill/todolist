import { Dispatch } from "redux"
import { setAppStatusAC } from "./app-reducer"
import { LoginType } from "features/Login/Login"
import { authAPI } from "api/api"
import { handleServerAppError, handleServerNetworkError } from "utils/handleErrorUtils"
import { clearDataAC } from "./todolist-reducer"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

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
})

export const loginTC = (data: LoginType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authAPI.login(data)
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as Error, dispatch)
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authAPI.logout()
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ isLoggedIn: false }))
      dispatch(clearDataAC())
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      handleServerAppError(res.data, dispatch)
    }
  } catch (e) {
    handleServerNetworkError(e as Error, dispatch)
  }
}

export const authReducer = slice.reducer
export const { setIsLoggedInAC } = slice.actions
