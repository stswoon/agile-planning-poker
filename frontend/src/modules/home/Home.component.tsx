import { ChangeEvent, FC, memo, useCallback, useEffect } from "react";
import { useUserStore } from "./User.store.ts";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { strings } from "../common/constants/Strings.constants.ts";
import { getRandomRoomId } from "../common/utils/Random.util.ts";
import { useNavigate, useSearchParams } from "react-router";
import { routes } from "../common/constants/Routes.constants.ts";
import { CenterVertical } from "../common/components/CenterVertical.component.tsx";

const Home: FC = memo(() => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const redirectRoomId = searchParams.get(routes.navigation.redirectRoomIdSearchParamName);

    const userId = useUserStore((state) => state.localUser.id);
    const userName = useUserStore((state) => state.localUser.name);
    const setUserName = useUserStore((state) => state.setUserName);

    useEffect(() => {
        console.log(`User name is - ${userName} (${userId})`);
    }, [userId, userName]);

    const createRoom = useCallback(async () => {
        const roomId = getRandomRoomId();
        await navigate(routes.navigation.room(roomId));
    }, [navigate]);

    const backToRoom = useCallback(async () => {
        if (redirectRoomId) {
            await navigate(routes.navigation.room(redirectRoomId));
        } else {
            console.error("redirectRoomId is empty");
        }
    }, [navigate, redirectRoomId]);

    return (
        <Box className="taHome" sx={{ height: "100vh" }}>
            <CenterVertical>
                <Stack direction="column" gap={2}>
                    <TextField
                        label={strings.enterName}
                        value={userName}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
                    />

                    <Button variant="contained" size="large" onClick={redirectRoomId ? backToRoom : createRoom}>
                        <Typography variant="h3">{redirectRoomId ? strings.backToRoom : strings.createRoom}</Typography>
                    </Button>
                </Stack>
            </CenterVertical>
        </Box>
    );
});

export { Home };

//TODO: titile, meta, cookie, descr on start screen