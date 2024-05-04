import { AppRootStateType } from "../store"
import { RequestStatusType } from "../app-reducer"

export const appStatusSelector = (state: AppRootStateType): RequestStatusType =>
  state.app.status
