import { UserAndVote, UserId } from "@stswoon/shared";
import { FC, memo, useCallback, useMemo } from "react";
import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { strings } from "../../../common/constants/Strings.constants.ts";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { BoxBlinkAnimation } from "../../../common/components/BoxBlinkAnimation.component.tsx";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export interface UserStatusListProps {
    usersAndVotes: UserAndVote[];
    showCards: boolean;
    currentUserId: UserId;
}

const UserStatusList: FC<UserStatusListProps> = memo(({ usersAndVotes, showCards, currentUserId }) => {
    const displayAverage = useMemo(() => {
        if (showCards) {
            const userWithCards = usersAndVotes.filter(
                (userAndVote) => typeof userAndVote.vote?.cardValue === "number",
            );
            if (!userWithCards.length) {
                return strings.noCard;
            }
            let average: number = userWithCards.reduce(
                (acc: number, userAndVote: UserAndVote) => acc + (userAndVote.vote?.cardValue as number),
                0,
            );
            average = average / userWithCards.length;
            average = Math.round(average * 10) / 10;
            return average;
        } else {
            return <VisibilityOffIcon />;
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
        <Box className="taUserStatusList">
            <Stack flexDirection="row" padding={2}>
                <Typography variant="h6">{strings.average}</Typography>
                <Typography variant="h6" display="flex" alignItems="center" paddingLeft={1}>
                    {displayAverage}
                </Typography>
            </Stack>

            <TableContainer sx={{ maxHeight: 440 }}>
                <Table size="small">
                    <TableBody>
                        {usersAndVotes.map((userAndVote) => (
                            <TableRow key={userAndVote.user.id}>
                                <TableCell>
                                    <Stack direction="row" gap={0.5} alignContent="center" justifyItems="center">
                                        {!userAndVote.user.active && (
                                            <BoxBlinkAnimation>
                                                <NoAccountsIcon color="error" fontSize="small" />
                                            </BoxBlinkAnimation>
                                        )}
                                        <Typography
                                            variant="body2"
                                            fontWeight={userAndVote.user.id === currentUserId ? "bold" : undefined}
                                            noWrap
                                            width="150px"
                                        >
                                            {userAndVote.user.name}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography noWrap variant="body2">
                                        {displayCardValue(userAndVote.vote?.cardValue)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
});

export { UserStatusList };
