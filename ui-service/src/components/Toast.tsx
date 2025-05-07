import { Alert, Snackbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "src/app/hooks";
import type { RootState } from "src/app/store";
import { clearToast } from "src/modules/toast/toastSlice";

export const Toast = () => {
  const dispatch = useAppDispatch();
  const { message, severity } = useAppSelector(
    (state: RootState) => state.toast,
  );

  const handleClose = () => {
    dispatch(clearToast());
  };

  return (
    <Snackbar
      open={!!message}
      onClose={handleClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={severity} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
