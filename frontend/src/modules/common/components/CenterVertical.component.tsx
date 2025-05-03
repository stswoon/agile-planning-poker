import { FC, memo, PropsWithChildren } from "react";
import { Box } from "@mui/material";

const CenterVertical: FC<PropsWithChildren> = memo(({ children }) => (
    <Box
        className="taCenterVertical"
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
        }}
    >
        {children}
    </Box>
));

export { CenterVertical };
