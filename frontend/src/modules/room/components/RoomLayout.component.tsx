import { Box, Divider, Stack } from "@mui/material";
import { FC, memo, ReactNode } from "react";
import { CenterHorizontal } from "../../common/components/CenterHorizontal.component.tsx";
import cl from "classnames";
import { SCORE_BOARD_DRAWER_WIDTH } from "../constants/HtmlPositioning.constants.ts";

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
                height: "calc(100vh - 20px)", //20 px to save on horizontal scroll
            }}
        >
            <Stack direction="row" sx={{ height: "100%" }}>
                <Stack sx={{ width: `calc(100% - ${SCORE_BOARD_DRAWER_WIDTH}px)`, height: "100%" }} gap={1}>
                    <Box sx={{ height: "60%" }} paddingRight={1} paddingLeft={1}>
                        <CenterHorizontal>{cardTable}</CenterHorizontal>
                    </Box>
                    <Divider />
                    <Box sx={{ height: "40%" }}>
                        <CenterHorizontal>{cardDeck}</CenterHorizontal>
                    </Box>
                </Stack>
                <Box sx={{ width: SCORE_BOARD_DRAWER_WIDTH + "px", height: "100%" }}>{scoreBoard}</Box>
            </Stack>
        </Box>
    );
});

export { RoomLayout };
