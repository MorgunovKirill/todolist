import { Dispatch } from "redux";
import { BaseResponseType } from "../types";
import { appActions } from "../../app/app-reducer";

export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] }));
  } else {
    dispatch(appActions.setAppError({ error: "Some error occurred" }));
  }
  dispatch(appActions.setAppStatus({ status: "failed" }));
};