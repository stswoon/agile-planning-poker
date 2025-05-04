import { FC, memo, ReactNode } from "react";
import { Box } from "@mui/material";

export interface BoxAnimationUpDownProps {
    animationMode: "up" | "down";
    children: ReactNode;
}

const upDownShift = 50;

const BoxAnimationUpDown: FC<BoxAnimationUpDownProps> = memo(({ animationMode, children }) => {
    return (
        <Box
            sx={{
                height: "100%",
                animation: `${animationMode === "up" ? "slideUpAnimation" : "slideDownAnimation"} 1s ease-in`,
                "@keyframes slideUpAnimation": {
                    "0%": { opacity: 0, transform: `translateY(${-upDownShift}px)` },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
                "@keyframes slideDownAnimation": {
                    "0%": { opacity: 0, transform: `translateY(${upDownShift}px)` },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            }}
        >
            {children}
        </Box>
    );
});

export { BoxAnimationUpDown };
