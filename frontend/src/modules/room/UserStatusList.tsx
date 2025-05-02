import { UserAndVote, UserId } from "common";
import { FC, memo, useCallback, useMemo } from "react";
import { Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { strings } from "../../constants/strings.constants.ts";

export interface UserStatusListProps {
    usersAndVotes: UserAndVote[];
    showCards: boolean;
    currentUserId: UserId;
}

const UserStatusList: FC<UserStatusListProps> = ({ usersAndVotes, showCards, currentUserId }) => {
    const displayAverage = useMemo(() => {
        if (showCards) {
            const userWithCards = usersAndVotes.filter((userAndVote) => typeof userAndVote.vote?.cardValue === "number");
            let average: number = userWithCards.reduce(
                (acc: number, userAndVote: UserAndVote) => acc + (userAndVote.vote?.cardValue as number),
                0,
            );
            average = average / userWithCards.length;
            average = Math.round(average * 10) / 10;
            return average;
        } else {
            return strings.hiddenCardValue;
        }
    }, [showCards, usersAndVotes]);

    const displayCardValue = useCallback(
        (cardValue?: string | number) => {
            if (showCards) {
                return cardValue !== undefined ? cardValue : strings.noCard;
            } else {
                return cardValue !== undefined ? strings.hiddenCardValue : strings.noCard;
            }
        },
        [showCards],
    );

    return (
        <>
            <Typography variant="h6" padding={2}>
                {strings.average}
                {displayAverage}
            </Typography>
            <Table size="small">
                <TableBody>
                    {usersAndVotes.map((userAndVote) => (
                        <TableRow key={userAndVote.user.id}>
                            <TableCell>
                                <Stack direction="row" gap={0.5}>
                                    {/*TODO: blink*/}
                                    {!userAndVote.user.active && <NoAccountsIcon color="error" fontSize="small" />}
                                    <Typography
                                        variant="body2"
                                        fontWeight={userAndVote.user.id === currentUserId ? "bold" : undefined}
                                    >
                                        {userAndVote.user.name}
                                    </Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align="right">{displayCardValue(userAndVote.vote?.cardValue)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default memo(UserStatusList);
