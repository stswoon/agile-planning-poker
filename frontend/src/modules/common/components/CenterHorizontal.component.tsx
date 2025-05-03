import { FC, memo, PropsWithChildren } from "react";
import { Box } from "@mui/material";

const CenterHorizontal: FC<PropsWithChildren> = memo(({ children }) => (
    <Box className="taCenterHorizontal" sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
        {children}
    </Box>
));

export { CenterHorizontal };
