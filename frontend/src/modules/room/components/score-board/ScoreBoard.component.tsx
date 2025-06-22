import { FC, memo, useCallback } from "react";
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
    IconButton,
} from "@mui/material";
import { strings } from "../../../common/constants/Strings.constants.ts";
import { routes } from "../../../common/constants/Routes.constants.ts";
import { useRoomStore } from "../../stores/Room.store.ts";
import { useUserStore } from "../../../common/stores/User.store.ts";
import { YandexAd } from "../../../common/components/YandexAd.component.tsx";
import { UserStatusList } from "./UserStatusList.component.tsx";
import { CenterVertical } from "../../../common/components/CenterVertical.component.tsx";
import { SCORE_BOARD_DRAWER_WIDTH } from "../../constants/HtmlPositioning.constants.ts";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { notify } from "../../../common/utils/Notification.util.tsx";

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

    const copyRoomUrl = useCallback(async () => {
        const url = window.location.toString();
        try {
            await navigator.clipboard.writeText(url);
            notify(strings.roomCopySuccessMessage, "info");
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    }, []);

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
                    <IconButton onClick={copyRoomUrl}>
                        <ContentCopyIcon />
                    </IconButton>
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
                        <Stack>
                            <Typography variant="body2">{strings.donate.prefix}</Typography>
                            <Typography variant="body2">{strings.donate.stripe}</Typography>
                        </Stack>
                    </Button>
                    <Button variant="text" color="warning" fullWidth href={routes.donateYoomoney}>
                        <Stack>
                            <Typography variant="body2">{strings.donate.prefix}</Typography>
                            <Typography variant="body2">{strings.donate.yoomoney}</Typography>
                        </Stack>
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

            <Stack className="taBottomToolbar" paddingTop={1} marginTop="auto" height="100px" justifyContent="end">
                <YandexAd />
                <CenterVertical>
                    <Link href={strings.anotherProgram}>{strings.anotherProgram}</Link>
                </CenterVertical>
            </Stack>
        </Drawer>
    );
});

export { ScoreBoard };
