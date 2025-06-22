import { FC, memo } from "react";
import { Button } from "@mui/material";
import { closeSnackbar, SnackbarKey } from "notistack";
import CloseIcon from "@mui/icons-material/Close";

interface NotificationActionProps {
    snackbarId: SnackbarKey;
}

const NotificationAction: FC<NotificationActionProps> = memo(({ snackbarId }) => (
    <Button sx={{ backgroundColor: "whitesmoke" }} size="small" onClick={() => closeSnackbar(snackbarId)}>
        <CloseIcon />
    </Button>
));

export { NotificationAction };
