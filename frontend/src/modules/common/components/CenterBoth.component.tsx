import { FC, memo, PropsWithChildren } from "react";
import { Box } from "@mui/material";

const CenterBoth: FC<PropsWithChildren> = memo(({ children }) => (
    <Box
        className="taCenterBoth"
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

export { CenterBoth };
