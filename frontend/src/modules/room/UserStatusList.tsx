import { UserId } from "common";
import { FC, memo, useCallback, useMemo } from "react";
import { Stack, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import { strings } from "../../constants/strings.constants.ts";

export interface UserStatus {
    userId: UserId;
    userName: string;
    active: boolean;
    cardValue?: string | number;
}

export interface UserStatusListProps {
    userStatuses: UserStatus[];
    showCards: boolean;
}

const UserStatusList: FC<UserStatusListProps> = ({ userStatuses, showCards }) => {
    const displayAverage = useMemo(() => {
        if (showCards) {
            const userWithCards = userStatuses.filter((userStatus) => typeof userStatus.cardValue === "number");
            let average: number = userWithCards.reduce(
                (acc: number, userStatus: UserStatus) => acc + (userStatus.cardValue as number),
                0,
            );
            average = average / userWithCards.length;
            average = Math.round(average * 10) / 10;
            return average;
        } else {
            return strings.hiddenCardValue;
        }
    }, [showCards, userStatuses]);

    const displayCardValue = useCallback(
        (cardValue?: string | number) => {
            if (showCards) {
                return cardValue ? cardValue : strings.noCard;
            } else {
                return cardValue ? strings.hiddenCardValue : strings.noCard;
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
                    {userStatuses.map((userStatus) => (
                        <TableRow key={userStatus.userId}>
                            <TableCell>
                                <Stack direction="row" gap={0.5}>
                                    {!userStatus.active && <NoAccountsIcon color="error" fontSize="small" />}
                                    <Typography variant="body2">{userStatus.userName}</Typography>
                                </Stack>
                            </TableCell>
                            <TableCell align="right">{displayCardValue(userStatus.cardValue)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default memo(UserStatusList);
