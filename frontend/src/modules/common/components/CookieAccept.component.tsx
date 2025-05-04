import { FC, memo, PropsWithChildren, useCallback, useMemo, useState } from "react";
import { Button, Snackbar } from "@mui/material";
import { strings } from "../constants/Strings.constants.ts";
import { COOKIE_ACCEPT_KEY } from "../constants/Storage.constants.ts";

const CookieAccept: FC<PropsWithChildren> = memo(({ children }) => {
    const initOpen = localStorage.getItem(COOKIE_ACCEPT_KEY) !== "true";
    const [open, setOpen] = useState<boolean>(initOpen);

    const handleClose = useCallback(() => {
        setOpen(false);
        localStorage.setItem(COOKIE_ACCEPT_KEY, "true");
    }, []);

    const action = useMemo(
        () => (
            <Button onClick={handleClose} size="large">
                {strings.cookieAcceptButton}
            </Button>
        ),
        [handleClose],
    );

    return (
        <>
            {children}
            <Snackbar className="taCookieAccept" open={open} message={strings.cookieAccept} action={action} />
        </>
    );
});

export { CookieAccept };
