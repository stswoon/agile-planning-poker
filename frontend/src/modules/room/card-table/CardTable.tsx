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
    const users = useRoomStore((state) => state.room.users);
    const votes = useRoomStore((state) => state.room.votes);
    const showCards = useRoomStore((state) => state.room.showCards);

    const { usersUp, usersDown } = useMemo(() => {
        const result: { usersUp: ReactElement[]; usersDown: ReactElement[] } = {
            usersUp: [],
            usersDown: [],
        };
        Object.values(users).forEach((user, index) => {
            const userOnTable = <UserOnTable key={index} name={user.name} order={index} />;
            if (index % 2 === 0) {
                const box = <BoxAnimationUp animationMode="up">{userOnTable}</BoxAnimationUp>;
                result.usersUp.push(box);
            } else {
                const box = <BoxAnimationUp animationMode="down">{userOnTable}</BoxAnimationUp>;
                result.usersDown.push(box);
            }
        });
        return result;
    }, [users]);

    const { votesUp, votesDown } = useMemo(() => {
        const result: { votesUp: ReactElement[]; votesDown: ReactElement[] } = {
            votesUp: [],
            votesDown: [],
        };
        Object.values(votes).forEach((vote, index) => {
            const cardOnTable = (
                <PokerCard
                    key={index}
                    value={vote.cardValue ?? 0}
                    rotateAngle={vote.rotateAngle}
                    nonVisible={vote.cardValue === undefined}
                    cardBack={!showCards}
                />
            );
            if (index % 2 === 0) {
                const box = <BoxAnimationUp animationMode="up">{cardOnTable}</BoxAnimationUp>;
                result.votesUp.push(box);
            } else {
                const box = <BoxAnimationUp animationMode="down">{cardOnTable}</BoxAnimationUp>;
                result.votesDown.push(box);
            }
        });
        return result;
    }, [votes]);

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
