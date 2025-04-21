import { FC, memo, PropsWithChildren } from "react";
import { Box } from "@mui/material";

const CenterBox: FC<PropsWithChildren> = ({ children }) => (
    <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        }}
    >
        {children}
    </Box>
);

export default memo(CenterBox);
