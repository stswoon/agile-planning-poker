import { ThemeProvider } from "@mui/material";
import { muiTheme } from "./modules/common/constants/MuiTheme.constants.ts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { FC, lazy, memo, Suspense } from "react";
// import { Home } from "./modules/home/Home.component.tsx";
// import { Room } from "./modules/room/components/Room.component.tsx";
import { CookieAccept } from "./modules/common/components/CookieAccept.component.tsx";
import { SnackbarProvider } from "notistack";
import { AppSkeleton } from "./modules/common/components/AppSkeleton.component.tsx";

const Home = lazy(async () => {
    const module = await import("./modules/home/Home.component.tsx");
    return { default: module.Home };
});
const Room = lazy(async () => {
    const module = await import("./modules/room/components/Room.component.tsx");
    return { default: module.Room };
});

const App: FC = memo(() => (
    <div className="taApp">
        <ThemeProvider theme={muiTheme}>
            <SnackbarProvider />
            <CookieAccept>
                <BrowserRouter>
                    <Suspense fallback={<AppSkeleton />}>
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="/room/:roomId" element={<Room />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </Suspense>
                </BrowserRouter>
            </CookieAccept>
        </ThemeProvider>
    </div>
));

export { App };
