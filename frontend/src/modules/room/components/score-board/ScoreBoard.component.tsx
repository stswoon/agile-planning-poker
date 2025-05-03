import { FC, memo } from "react";
import { Box, Divider, Toolbar, Drawer, Typography, Button, List, ListItem } from "@mui/material";
import { strings } from "../../../common/constants/Strings.constants.ts";
import { routes } from "../../../common/constants/Routes.constants.ts";
import { useRoomStore } from "../../stores/Room.store.ts";
import { useUserStore } from "../../../home/User.store.ts";
import { YandexAd } from "../../../common/components/YandexAd.component.tsx";
import { UserStatusList } from "./UserStatusList.component.tsx";

export interface ScoreBoardProps {
    onLeaveRoom: () => void;
    onChangeName: () => void;
    onFlipCards: () => void;
    onClearCards: () => void;
}

const ScoreBoard: FC<ScoreBoardProps> = memo(({ onLeaveRoom, onChangeName, onFlipCards, onClearCards }) => {
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
});

export { ScoreBoard };
