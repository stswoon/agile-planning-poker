import { FC, memo, PropsWithChildren } from "react";
import { Box } from "@mui/material";

const BoxBlinkAnimation: FC<PropsWithChildren> = memo(({ children }) => {
    return (
        <Box
            sx={{
                animation: "blinkAnimation 2s ease-in infinite",
                "@keyframes blinkAnimation": {
                    "0%": { opacity: 1 },
                    "50%": { opacity: 0.2 },
                    "100%": { opacity: 1 },
                },
            }}
        >
            {children}
        </Box>
    );
});

export { BoxBlinkAnimation };
