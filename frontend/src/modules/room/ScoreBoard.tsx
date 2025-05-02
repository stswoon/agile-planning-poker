import { FC, memo } from "react";
import { Box, Divider, Toolbar, Drawer, Typography, Button, List, ListItem } from "@mui/material";
import { strings } from "../../constants/strings.constants.ts";
import { routes } from "../../constants/routes.constants.ts";
import { useRoomStore } from "../../stores/room.store.ts";
import UserStatusList from "./UserStatusList.tsx";
import { useUserStore } from "../../stores/user.store.ts";
import YandexAd from "../YandexAd.tsx";

export interface ScoreBoardProps {
    onLeaveRoom: () => void;
    onChangeName: () => void;
    onFlipCards: () => void;
    onClearCards: () => void;
}

const ScoreBoard: FC<ScoreBoardProps> = ({ onLeaveRoom, onChangeName, onFlipCards, onClearCards }) => {
    const currentUserId = useUserStore((state) => state.localUser.id);
    const roomId = useRoomStore((state) => state.room.id);
    const usersAndVotes = useRoomStore((state) => state.room.usersAndVotes);
    const isShowCards = useRoomStore((state) => state.room.showCards);

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

            <UserStatusList usersAndVotes={usersAndVotes} showCards={isShowCards} currentUserId={currentUserId} />

            <Divider />

            <Box className="AD" paddingTop={1} marginBottom="auto" height={"300px"}>
                <YandexAd />
            </Box>
        </Drawer>
    );
};

export default memo(ScoreBoard);
