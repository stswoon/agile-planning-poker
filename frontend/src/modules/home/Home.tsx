import { ChangeEvent, memo, useCallback, useEffect } from "react";
import { useUserStore } from "../../stores/user.store.ts";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { strings } from "../../constants/strings.ts";
import { getRandomRoomId } from "../../utils/randomIds.util.ts";
import { useNavigate } from "react-router";
import { routes } from "../../constants/routes.ts";
import CenterVertical from "../../components/CenterVertical.tsx";

const Home = () => {
    const navigate = useNavigate();

    const userId = useUserStore((state) => state.localUser.id);
    const userName = useUserStore((state) => state.localUser.name);
    const setUserName = useUserStore((state) => state.setUserName);

    useEffect(() => {
        console.log(`User name is - ${userName} (${userId})`);
    }, [userId, userName]);

    useEffect(() => {

    }, []);

    const createRoom = useCallback(async () => {
        const roomId = getRandomRoomId();
        await navigate(routes.room(roomId));
    }, [navigate]);

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

                    <Button variant="contained" size="large" onClick={createRoom}>
                        <Typography variant="h3">{strings.createRoom}</Typography>
                    </Button>

                </Stack>
            </CenterVertical>
        </Box>
    );
};

export default memo(Home);
