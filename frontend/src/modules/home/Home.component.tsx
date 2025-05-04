import { ChangeEvent, FC, memo, useCallback, useEffect } from "react";
import { useUserStore } from "../common/stores/User.store.ts";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { strings } from "../common/constants/Strings.constants.ts";
import { getRandomRoomId } from "../common/utils/Random.util.ts";
import { useNavigate, useSearchParams } from "react-router";
import { routes } from "../common/constants/Routes.constants.ts";
import { CenterBoth } from "../common/components/CenterBoth.component.tsx";

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
            <CenterBoth>
                <Stack direction="column" gap={10}>
                    <CenterBoth>
                        <Typography width={800} textAlign="justify" variant={"subtitle1"}>
                            {strings.description.part1}
                            <b>{strings.description.part2}</b>
                            {strings.description.part3}
                        </Typography>
                    </CenterBoth>

                    <CenterBoth>
                        <Stack direction="column" gap={2} width={400}>
                            <TextField
                                label={strings.enterName}
                                value={userName}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => setUserName(event.target.value)}
                            />

                            <Button
                                variant="contained"
                                size="large"
                                onClick={redirectRoomId ? backToRoom : createRoom}
                                sx={{
                                    animation: "wiggle 20s infinite",
                                    animationDelay: "1s",
                                    "@keyframes wiggle": {
                                        "0%": { transform: "rotate(0deg)" },
                                        "0.5%": { transform: "rotate(-2deg)" },
                                        "1%": { transform: "rotate(2deg)" },
                                        "1.5%": { transform: "rotate(-2deg)" },
                                        "2%": { transform: "rotate(2deg)" },
                                        "2.5%": { transform: "rotate(-2deg)" },
                                        "3%": { transform: "rotate(0deg)" },
                                        "100%": { transform: "rotate(0deg)" },
                                    },
                                }}
                            >
                                <Typography variant="h3">
                                    {redirectRoomId ? strings.backToRoom : strings.createRoom}
                                </Typography>
                            </Button>
                        </Stack>
                    </CenterBoth>

                    <CenterBoth>
                        <Box
                            sx={{
                                border: "1px dashed black",
                                borderRadius: "30px",
                                padding: "10px",
                                width: "800px",
                            }}
                        >
                            <img
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "30px",
                                }}
                                src={"/images/demo-img.png"}
                                loading="lazy"
                                alt={"Demo image for this poker planing"}
                            />
                        </Box>
                    </CenterBoth>
                </Stack>
            </CenterBoth>
        </Box>
    );
});

export { Home };
