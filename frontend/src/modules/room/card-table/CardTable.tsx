import { FC, memo, ReactElement, ReactNode, useMemo } from "react";
import { Box, Stack } from "@mui/material";
import leftImg from "./left.webp";
import centerImg from "./center.webp";
import rightImg from "./right.webp";
import { useRoomStore } from "../../../stores/room.store.ts";
import UserOnTable from "./user-on-table/UserOnTable.tsx";
import { PokerCard } from "../poker-card/PokerCard.tsx";

const factorTableHeight = 0.5;

const BoxAnimationUp: FC<{ animationMode: "up" | "down"; children: ReactNode }> = memo(
    ({ animationMode, children }) => {
        const shift = 50;
        return (
            <Box
                sx={{
                    animation: `${animationMode === "up" ? "slideUpAnimation" : "slideDownAnimation"} 1s ease-in`,
                    "@keyframes slideUpAnimation": {
                        "0%": {
                            opacity: 0,
                            transform: `translateY(${-shift}px)`,
                        },
                        "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                        },
                    },
                    "@keyframes slideDownAnimation": {
                        "0%": {
                            opacity: 0,
                            transform: `translateY(${shift}px)`,
                        },
                        "100%": {
                            opacity: 1,
                            transform: "translateY(0)",
                        },
                    },
                }}
            >
                {children}
            </Box>
        );
    },
);

const CardTable = () => {
    const usersAndVotes = useRoomStore((state) => state.room.usersAndVotes);
    const showCards = useRoomStore((state) => state.room.showCards);

    const { usersUp, usersDown } = useMemo(() => {
        const result: { usersUp: ReactElement[]; usersDown: ReactElement[] } = {
            usersUp: [],
            usersDown: [],
        };
        usersAndVotes.forEach((userAndVote, index) => {
            const userOnTable = <UserOnTable key={index} name={userAndVote.user.name} order={index} />;
            if (index % 2 === 0) {
                const box = <BoxAnimationUp animationMode="up">{userOnTable}</BoxAnimationUp>;
                result.usersUp.push(box);
            } else {
                const box = <BoxAnimationUp animationMode="down">{userOnTable}</BoxAnimationUp>;
                result.usersDown.push(box);
            }
        });
        return result;
    }, [usersAndVotes]);

    const { votesUp, votesDown } = useMemo(() => {
        const result: { votesUp: ReactElement[]; votesDown: ReactElement[] } = {
            votesUp: [],
            votesDown: [],
        };
        usersAndVotes.forEach((userAndVote, index) => {
            let cardOnTable;
            if (userAndVote.vote) {
                cardOnTable = (
                    <PokerCard
                        key={index}
                        value={userAndVote.vote.cardValue ?? 0}
                        rotateAngle={userAndVote.vote.rotateAngle}
                        nonVisible={userAndVote.vote.cardValue === undefined}
                        cardBack={!showCards}
                    />
                );
            } else {
                cardOnTable = <Box></Box>;
            }
            if (index % 2 === 0) {
                const box = <BoxAnimationUp animationMode="up">{cardOnTable}</BoxAnimationUp>;
                result.votesUp.push(box);
            } else {
                const box = <BoxAnimationUp animationMode="down">{cardOnTable}</BoxAnimationUp>;
                result.votesDown.push(box);
            }
        });
        return result;
    }, [showCards, usersAndVotes]);

    return (
        <Stack className="taCardTable">
            <Stack className="taBenchUp" direction="row" justifyContent="space-around" alignItems="center">
                {usersUp}
            </Stack>

            <Stack direction="row" className="taTableInner" position="relative">
                <img
                    style={{
                        objectFit: "cover",
                        width: factorTableHeight * 585 + "px",
                        height: factorTableHeight * 917 + "px",
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
                        height: factorTableHeight * 917 + "px",
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
                        width: factorTableHeight * 585 + "px",
                        height: factorTableHeight * 917 + "px",
                    }}
                    src={rightImg}
                    loading="lazy"
                    alt={"Right table part"}
                />
            </Stack>

            <Stack className="taBenchDown" direction="row" justifyContent="space-around" alignItems="center">
                {usersDown}
            </Stack>
        </Stack>
    );
};

export default memo(CardTable);
