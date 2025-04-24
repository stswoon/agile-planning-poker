import { FC, memo, PropsWithChildren } from "react";
import { Box } from "@mui/material";

const CenterVertical: FC<PropsWithChildren> = ({ children }) => (
    <Box
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
        }}
    >
        {children}
    </Box>
);

export default memo(CenterVertical);
