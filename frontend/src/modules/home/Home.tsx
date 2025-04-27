import { ChangeEvent, memo, useCallback, useEffect } from "react";
import { useUserStore } from "../../stores/user.store.ts";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { strings } from "../../constants/strings.constants.ts";
import { getRandomRoomId } from "../../utils/randomIds.util.ts";
import { useNavigate, useSearchParams } from "react-router";
import { routes } from "../../constants/routes.constants.ts";
import CenterVertical from "../../components/CenterVertical.tsx";

const Home = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const redirectRoomId = searchParams.get("redirectRoomId");

    const userId = useUserStore((state) => state.localUser.id);
    const userName = useUserStore((state) => state.localUser.name);
    const setUserName = useUserStore((state) => state.setUserName);

    useEffect(() => {
        console.log(`User name is - ${userName} (${userId})`);
    }, [userId, userName]);

    const createRoom = useCallback(async () => {
        const roomId = getRandomRoomId();
        await navigate(routes.room(roomId));
    }, [navigate]);

    const backToRoom = useCallback(async () => {
        if (redirectRoomId) {
            await navigate(routes.room(redirectRoomId));
        }
    }, [navigate, redirectRoomId]);

    return (
        <Box sx={{ height: "100vh" }}>
            <CenterVertical>
                <Stack direction="column" gap={2}>
                    <TextField
                        label={strings.enterName}
                        value={userName}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                            setUserName(event.target.value);
                        }}
                    />

                    <Button variant="contained" size="large" onClick={redirectRoomId ? backToRoom : createRoom}>
                        <Typography variant="h3">{redirectRoomId ? strings.backToRoom : strings.createRoom}</Typography>
                    </Button>
                </Stack>
            </CenterVertical>
        </Box>
    );
};

export default memo(Home);
