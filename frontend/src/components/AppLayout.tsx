import { FC, memo, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import AppToolbar from "./AppToolbar.tsx";

const AppLayout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Box
            sx={{
                minWidth: "340px",
                width: "100vw",
                height: "100vh",
                background: "radial-gradient(circle, rgba(246,154,13,0.9) 20%, rgba(255,255,255,1) 100%)",
            }}
        >
            <AppToolbar />
            <Box
                sx={{
                    padding: "64px 8px 8px 8px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                }}
                paddingTop={3}
            >
                {children}
            </Box>
        </Box>
    );
};

export default memo(AppLayout);
