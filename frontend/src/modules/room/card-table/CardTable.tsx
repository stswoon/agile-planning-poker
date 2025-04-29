import { memo, ReactElement, useMemo } from "react";
import { Stack } from "@mui/material";
import leftImg from "./left.webp";
import centerImg from "./center.webp";
import rightImg from "./right.webp";
import { useRoomStore } from "../../../stores/room.store.ts";
import UserOnTable from "./user-on-table/UserOnTable.tsx";
import { PokerCard } from "../poker-card/PokerCard.tsx";

const factorTableHeight = 0.5;

const CardTable = () => {
    const users = useRoomStore((state) => state.room.users);
    const votes = useRoomStore((state) => state.room.votes);

    const { usersUp, usersDown } = useMemo(() => {
        const result: { usersUp: ReactElement[]; usersDown: ReactElement[] } = {
            usersUp: [],
            usersDown: [],
        };
        Object.values(users).forEach((user, index) => {
            const userOnTable = <UserOnTable key={index} name={user.name} order={index} />;
            if (index % 2 === 0) {
                result.usersUp.push(userOnTable);
            } else {
                result.usersDown.push(userOnTable);
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
                />
            );
            if (index % 2 === 0) {
                result.votesUp.push(cardOnTable);
            } else {
                result.votesDown.push(cardOnTable);
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
