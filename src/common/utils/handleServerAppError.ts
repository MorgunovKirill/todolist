import { Dispatch } from "redux";
import { BaseResponseType } from "../types";
import { appActions } from "../../app/model/app-reducer";

/**
 *
 * @param data
 * @param dispatch
 * @param isShowGlobalError
 */

export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true,
) => {
  if (isShowGlobalError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }));
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }));
    }
  }
};
