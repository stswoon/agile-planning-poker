import { Box, Stack } from "@mui/material";
import { FC, memo, ReactElement } from "react";
import CenterHorizontal from "../../components/CenterHorizontal.tsx";

export interface AppLayoutType {
    cardTable: ReactElement;
    cardDeck: ReactElement;
    scoreBoard: ReactElement;
}

const AppLayout: FC<AppLayoutType> = ({ cardTable, cardDeck, scoreBoard }) => {
    return (
        <Box
            sx={{
                minWidth: "1000px",
                minHeight: "700px",
                height: "98vh", //to save on horizontal scroll
            }}
        >
            <Stack direction="row" sx={{ height: "100%" }}>
                <Box sx={{ width: "calc(100% - 320px)", height: "100%" }}>
                    <Box sx={{ height: "70%" }}>
                        <CenterHorizontal>{cardTable}</CenterHorizontal>
                    </Box>
                    <Box sx={{ height: "30%" }}>
                        <CenterHorizontal>{cardDeck}</CenterHorizontal>
                    </Box>
                </Box>
                <Box sx={{ width: "320px", height: "100%" }}>{scoreBoard}</Box>
            </Stack>
        </Box>
    );
};

export default memo(AppLayout);
