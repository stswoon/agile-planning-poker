import { FC, memo } from "react";
import { Stack } from "@mui/material";
import { useRoomStore } from "../../stores/Room.store.ts";
import { useCardTableUsers } from "../../hooks/UseCardTableUsers.hook.tsx";
import { useCardTableVotes } from "../../hooks/UseCardTableVotes.hook.tsx";

import leftImg from "../../../../assets/TableLeft.webp";
import centerImg from "../../../../assets/TableCenter.webp";
import rightImg from "../../../../assets/TableRight.webp";

const tableSizeFactor = 0.5;

const CardTable: FC = memo(() => {
    const usersAndVotes = useRoomStore((state) => state.room.usersAndVotes);
    const showCards = useRoomStore((state) => state.room.showCards);

    const { usersUp, usersDown } = useCardTableUsers(usersAndVotes);
    const { votesUp, votesDown } = useCardTableVotes(usersAndVotes, showCards);

    return (
        <Stack className="taCardTable" height={"100%"}>
            <Stack height="20%" className="taBenchUp" direction="row" justifyContent="space-around" alignItems="center">
                {usersUp}
            </Stack>

            <Stack height="60%" direction="row" className="taCardTableInner" position="relative">
                <img
                    style={{
                        objectFit: "cover",
                        maxWidth: tableSizeFactor * 585 + "px",
                        maxHeight: tableSizeFactor * 917 + "px",
                    }}
                    src={leftImg}
                    loading="lazy"
                    alt={"Left table part"}
                />

                <Stack
                    className="taCardPlaceholderUp"
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    width="100%"
                    position="absolute"
                    top={0}
                >
                    {votesUp}
                </Stack>
                <img
                    style={{
                        //objectFit: "cover",
                        //width: factorHeight * 257 * 4 + "px",
                        width: "100%",
                        maxHeight: tableSizeFactor * 917 + "px",
                    }}
                    src={centerImg}
                    loading="lazy"
                    alt={"Center table part"}
                />
                <Stack
                    className="taCardPlaceholderUp"
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    width="100%"
                    position="absolute"
                    bottom={0}
                >
                    {votesDown}
                </Stack>

                <img
                    style={{
                        objectFit: "cover",
                        maxWidth: tableSizeFactor * 585 + "px",
                        maxHeight: tableSizeFactor * 917 + "px",
                    }}
                    src={rightImg}
                    loading="lazy"
                    alt={"Right table part"}
                />
            </Stack>

            <Stack
                height="20%"
                className="taBenchDown"
                direction="row"
                justifyContent="space-around"
                alignItems="center"
            >
                {usersDown}
            </Stack>
        </Stack>
    );
});

export { CardTable };
