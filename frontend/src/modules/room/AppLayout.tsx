import { Box, Stack } from "@mui/material";
import { FC, memo, ReactElement } from "react";

export interface AppLayoutType {
    cardTable: ReactElement;
    cardDeck: ReactElement;
    gameMenu: ReactElement;
}

const AppLayout: FC<AppLayoutType> = ({ cardTable, cardDeck, gameMenu }) => {
    return (
        <Box
            sx={{
                minWidth: "1000px",
                minHeight: "700px",
                width: "100vw",
                height: "98vh", //to save on horizontal scroll
                // background: "radial-gradient(circle, rgba(246,154,13,0.9) 20%, rgba(255,255,255,1) 100%)",
            }}
        >
            <Stack direction="row" sx={{ height: "100%" }}>
                <Box sx={{ width: "80%", height: "100%" }}>
                    <Box sx={{ height: "70%" }}>{cardTable}</Box>
                    <Box sx={{ height: "30%" }}>{cardDeck}</Box>
                </Box>
                <Box sx={{ width: "20%", height: "100%" }}>{gameMenu}</Box>
            </Stack>
        </Box>
    );
};

export default memo(AppLayout);
