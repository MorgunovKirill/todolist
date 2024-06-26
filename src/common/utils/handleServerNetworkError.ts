import { appActions } from "app/model/app-reducer";
import axios from "axios";
import { AppDispatchType } from "./useAppDispatch";

export const handleServerNetworkError = (
  err: unknown,
  dispatch: AppDispatchType,
): void => {
  let errorMessage = "Some error occurred";

  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(appActions.setAppError({ error: errorMessage }));
};
