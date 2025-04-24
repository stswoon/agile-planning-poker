import { ThemeProvider } from "@mui/material";
import { muiTheme } from "./constants/muiTheme.ts";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { memo } from "react";
import Home from "./modules/home/Home.tsx";
import Room from "./modules/room/Room.tsx";

const App = () => (
    <ThemeProvider theme={muiTheme}>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/room/:roomId" element={<Room />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    </ThemeProvider>
);

export default memo(App);
