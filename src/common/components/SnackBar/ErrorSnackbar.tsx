import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { appActions } from "app/app-reducer";
import { useAppDispatch, useAppSelector } from "../../utils";

export function CustomizedSnackbars() {
  const dispatch = useAppDispatch();
  const error = useAppSelector<string | null>((state) => state.app.error);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(appActions.setAppError({ error: null }));
  };

  return (
    <div>
      <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}