import { FC, memo } from "react";
import { Box, Skeleton, Stack } from "@mui/material";
import { SCORE_BOARD_DRAWER_WIDTH } from "../../room/constants/HtmlPositioning.constants.ts";
import { CenterHorizontal } from "./CenterHorizontal.component.tsx";

const cards = Array.from({ length: 14 }, (_, index) => index + 1);

const AppSkeleton: FC = memo(() => {
    return (
        <Box
            className="taAppSkeleton"
            padding={1}
            sx={{
                minWidth: "900px",
                minHeight: "500px",
                height: "calc(100vh - 20px)",
            }}
        >
            <Stack direction="row" gap={2} height="100%" width="100%">
                <Stack gap={2} sx={{ width: `calc(100% - ${SCORE_BOARD_DRAWER_WIDTH}px)`, height: "100%" }}>
                    <Skeleton className="taTableSkeleton" variant="rounded" width="100%" height="60%" />

                    <Box height="40%">
                        <CenterHorizontal>
                            <Stack direction="row" className="taDeckSkeleton" gap={2} flexWrap="wrap" height="100%">
                                {cards.map((value) => (
                                    <Skeleton
                                        key={value}
                                        variant="rounded"
                                        sx={{
                                            width: `calc(${(100 / cards.length) * 1.5}%)`,
                                            height: "40%",
                                        }}
                                    />
                                ))}
                            </Stack>
                        </CenterHorizontal>
                    </Box>
                </Stack>

                <Skeleton className="taBoardSkeleton" variant="rounded" width={320} height="100%" />
            </Stack>
        </Box>
    );
});

export { AppSkeleton };
