import { FC, memo, useMemo } from "react";
import { Box, Divider, Toolbar, Drawer, Typography, Button, List, ListItem } from "@mui/material";
import { strings } from "../../constants/strings.constants.ts";
import { routes } from "../../constants/routes.constants.ts";
import { useRoomStore } from "../../stores/room.store.ts";
import UserStatusList, { UserStatus } from "./UserStatusList.tsx";

export interface ScoreBoardProps {
    onLeaveRoom: () => void;
    onChangeName: () => void;
    onFlipCards: () => void;
    onClearCards: () => void;
}

const ScoreBoard: FC<ScoreBoardProps> = ({ onLeaveRoom, onChangeName, onFlipCards, onClearCards }) => {
    const roomId = useRoomStore((state) => state.room.id);
    const votes = useRoomStore((state) => state.room.votes);
    const users = useRoomStore((state) => state.room.users);
    const isShowCards = useRoomStore((state) => state.room.showCards);

    const userStatuses: UserStatus[] = useMemo(() => {
        return Object.values(users).map((user) => {
            const vote = votes[user.id];
            return {
                userId: user.id,
                userName: user.name,
                active: user.active,
                cardValue: vote?.cardValue,
            };
        });
    }, [users, votes]);

    return (
        <Drawer
            className="taScoreBoard"
            sx={{
                "& .MuiDrawer-paper": {
                    width: "320px", //TODO const
                    padding: "10px",
                },
            }}
            variant="permanent"
            anchor="right"
        >
            <Toolbar>
                <Typography>
                    {strings.appName} {strings.appVersionPrefix}
                    {__APP_VERSION__}
                </Typography>
            </Toolbar>

            <Divider />

            <List>
                <ListItem>
                    <Typography>
                        {strings.roomName}
                        {roomId}
                    </Typography>
                    <Typography>
                        {strings.you}
                        {roomId}
                    </Typography>
                </ListItem>
                <ListItem>
                    <Button variant="outlined" color="secondary" onClick={onLeaveRoom}>
                        {strings.leaveRoom}
                    </Button>
                    <Button variant="outlined" onClick={onChangeName}>
                        {strings.changeName}
                    </Button>
                </ListItem>
                <ListItem>
                    <Button variant="text" color="warning" fullWidth href={routes.donate}>
                        {strings.donate}
                    </Button>
                </ListItem>
                <ListItem>
                    <Button variant="outlined" color="success" fullWidth onClick={onFlipCards}>
                        {strings.flipCards}
                    </Button>
                    <Button variant="outlined" color="error" fullWidth onClick={onClearCards}>
                        {strings.clearCards}
                    </Button>
                </ListItem>
            </List>

            <Divider />

            <UserStatusList userStatuses={userStatuses} showCards={isShowCards} />

            <Divider />

            <Box className="AD">TODO</Box>
        </Drawer>
    );
};

export default memo(ScoreBoard);
