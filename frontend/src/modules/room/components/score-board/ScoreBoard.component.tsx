import { FC, memo } from "react";
import {
    Divider,
    Toolbar,
    Drawer,
    Typography,
    Button,
    List,
    ListItem,
    ButtonGroup,
    Link,
    Stack,
    CircularProgress,
    Box,
} from "@mui/material";
import { strings } from "../../../common/constants/Strings.constants.ts";
import { routes } from "../../../common/constants/Routes.constants.ts";
import { useRoomStore } from "../../stores/Room.store.ts";
import { useUserStore } from "../../../common/stores/User.store.ts";
import { YandexAd } from "../../../common/components/YandexAd.component.tsx";
import { UserStatusList } from "./UserStatusList.component.tsx";
import { CenterVertical } from "../../../common/components/CenterVertical.component.tsx";
import { SCORE_BOARD_DRAWER_WIDTH } from "../../constants/HtmlPositioning.constants.ts";

export interface ScoreBoardProps {
    onLeaveRoom: () => void;
    onChangeName: () => void;
    onFlipCards: () => void;
    onClearCards: () => void;

    isLoading?: boolean;
}

const ScoreBoard: FC<ScoreBoardProps> = memo(({ onLeaveRoom, onChangeName, onFlipCards, onClearCards, isLoading }) => {
    const currentUserId = useUserStore((state) => state.localUser.id);
    const roomId = useRoomStore((state) => state.room.id);
    const usersAndVotes = useRoomStore((state) => state.room.usersAndVotes);
    const isShowCards = useRoomStore((state) => state.room.showCards);

    return (
        <Drawer
            className="taScoreBoard"
            sx={{
                "& .MuiDrawer-paper": {
                    width: SCORE_BOARD_DRAWER_WIDTH + "px",
                    padding: "10px",
                },
            }}
            variant="permanent"
            anchor="right"
        >
            <Toolbar>
                <Typography variant="h6">
                    {strings.appName} {strings.appVersionPrefix}
                    {__APP_VERSION__}
                </Typography>

                {isLoading && (
                    <Box paddingLeft={2}>
                        <CircularProgress size="20px" />
                    </Box>
                )}
            </Toolbar>

            <Divider />

            <List>
                <ListItem>
                    <Typography variant="body2">
                        {strings.roomName}
                        {roomId}
                    </Typography>
                </ListItem>

                <ListItem>
                    <ButtonGroup fullWidth>
                        <Button variant="outlined" color="secondary" onClick={onLeaveRoom}>
                            {strings.leaveRoom}
                        </Button>
                        <Button variant="outlined" onClick={onChangeName}>
                            {strings.changeName}
                        </Button>
                    </ButtonGroup>
                </ListItem>

                <ListItem>
                    <Button variant="text" color="warning" fullWidth href={routes.donateStripe}>
                        {strings.donateStripe}
                    </Button>
                </ListItem>
                <ListItem>
                    <Button variant="text" color="warning" fullWidth href={routes.donateYoomoney}>
                        {strings.donateYoomoney}
                    </Button>
                </ListItem>

                <ListItem>
                    <ButtonGroup fullWidth>
                        <Button variant="outlined" color="success" fullWidth onClick={onFlipCards}>
                            {strings.flipCards}
                        </Button>
                        <Button variant="outlined" color="error" fullWidth onClick={onClearCards}>
                            {strings.clearCards}
                        </Button>
                    </ButtonGroup>
                </ListItem>
            </List>

            <Divider />

            <UserStatusList usersAndVotes={usersAndVotes} showCards={isShowCards} currentUserId={currentUserId} />

            <Divider />

            <Stack className="taBottomToolbar" paddingTop={1} marginTop="auto" height="300px" justifyContent="end">
                <YandexAd />
                <CenterVertical>
                    <Link href={strings.anotherProgram}>{strings.anotherProgram}</Link>
                </CenterVertical>
            </Stack>
        </Drawer>
    );
});

export { ScoreBoard };
