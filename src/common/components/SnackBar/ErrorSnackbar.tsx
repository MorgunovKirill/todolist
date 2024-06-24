import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAppSelector } from "../../utils";
import { useActions } from "../../hooks/useActions";

export function CustomizedSnackbars() {
  const { setAppError } = useActions();
  const error = useAppSelector<string | null>((state) => state.app.error);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setAppError({ error: null });
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
