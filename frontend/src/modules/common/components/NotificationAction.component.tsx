import { FC, memo } from "react";
import { Button } from "@mui/material";
import { closeSnackbar, SnackbarKey } from "notistack";
import { strings } from "../constants/Strings.constants.ts";

interface NotificationActionProps {
    snackbarId: SnackbarKey;
}

const NotificationAction: FC<NotificationActionProps> = memo(({ snackbarId }) => (
    <Button
        variant="text"
        sx={{ backgroundColor: "whitesmoke" }}
        size="small"
        onClick={() => closeSnackbar(snackbarId)}
    >
        {strings.closeNotification}
    </Button>
));

export { NotificationAction };
