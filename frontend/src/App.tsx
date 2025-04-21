import AppLayout from "./components/AppLayout.tsx";
import { ThemeProvider } from "@mui/material";
import StubApp from "./components/StubApp.tsx";
import { muiTheme } from "./constants/muiTheme.ts";

const App = () => (
    <ThemeProvider theme={muiTheme}>
        <AppLayout>
            <StubApp />
        </AppLayout>
    </ThemeProvider>
);

export default App;
