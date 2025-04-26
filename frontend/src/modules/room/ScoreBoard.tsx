import { memo } from "react";
import { Box } from "@mui/material";

const ScoreBoard = () => {
    return (
        <Box>
            Menu {/*{stringsConstants.header.appName}*/} {/*{stringsConstants.header.appV}*/}
            {__APP_VERSION__}
            {/*{stringsConstants.header.seeAlso}*/}Donate,Ad
        </Box>
    );
};

export default memo(ScoreBoard);
