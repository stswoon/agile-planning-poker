import { enqueueSnackbar, SnackbarKey } from "notistack";
import { NotificationAction } from "../components/NotificationAction.component.tsx";

export function notify(message: string, variant: "error" | "success" | "warning" | "info"): void {
    enqueueSnackbar(message, {
        variant,
        anchorOrigin: {
            vertical: "top",
            horizontal: "left",
        },
        autoHideDuration: 5000,
        preventDuplicate: true,
        action: (snackbarId: SnackbarKey) => <NotificationAction snackbarId={snackbarId} />,
    });
}
