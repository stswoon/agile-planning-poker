import { ThemeProvider } from "@mui/material";
import { muiTheme } from "./modules/common/constants/MuiTheme.constants.ts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { FC, memo } from "react";
import { Home } from "./modules/home/Home.component.tsx";
import { Room } from "./modules/room/components/Room.component.tsx";
import { CookieAccept } from "./modules/common/components/CookieAccept.component.tsx";

const App: FC = memo(() => (
    <div className="taApp">
        <ThemeProvider theme={muiTheme}>
            <CookieAccept>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/room/:roomId" element={<Room />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </BrowserRouter>
            </CookieAccept>
        </ThemeProvider>
    </div>
));

export { App };
