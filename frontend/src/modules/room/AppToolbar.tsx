import { FC, memo } from "react";
import { AppBar, Grid, Stack, Toolbar, Typography } from "@mui/material";

const AppToolbar: FC = () => (
    <AppBar position="absolute" color="transparent">
        <Toolbar>
            <Grid
                width="100%"
                container
                spacing={1}
                sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Grid size={{ mobile: 12, tablet: 6 }}>
                    <Stack spacing={1} direction="row" alignItems="center">
                        <Typography variant="subtitle1" noWrap>
                            {/*{stringsConstants.header.appName}*/}
                        </Typography>

                        <Typography variant="subtitle2" noWrap>
                            {/*{stringsConstants.header.appV}*/}
                            {__APP_VERSION__}
                        </Typography>
                    </Stack>
                </Grid>

                <Grid size={{ mobile: 12, tablet: 6 }}>
                    <Stack spacing={1} direction="row" alignItems="center" justifyContent="right">
                        <Typography variant="subtitle1" noWrap>
                            {/*{stringsConstants.header.seeAlso}*/}
                        </Typography>

                        {/*<Link variant="subtitle2" href={stringsConstants.header.link}>*/}
                        {/*    {stringsConstants.header.link}*/}
                        {/*</Link>*/}
                    </Stack>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
);

export default memo(AppToolbar);
