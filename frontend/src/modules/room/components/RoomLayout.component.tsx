import { Box, Stack } from "@mui/material";
import { FC, memo, ReactNode } from "react";
import { CenterHorizontal } from "../../common/components/CenterHorizontal.component.tsx";
import cl from "classnames";

export interface AppLayoutType {
    cardTable: ReactNode;
    cardDeck: ReactNode;
    scoreBoard: ReactNode;

    className: string;
}

const RoomLayout: FC<AppLayoutType> = memo(({ cardTable, cardDeck, scoreBoard, className }) => {
    return (
        <Box
            className={cl("taRoomLayout", className)}
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
});

export { RoomLayout };
