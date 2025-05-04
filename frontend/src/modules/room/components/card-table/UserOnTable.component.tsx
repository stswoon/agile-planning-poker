import { FC, memo } from "react";
import { Stack, Typography } from "@mui/material";

import u1 from "../../../../assets/users/1.webp";
import u2 from "../../../../assets/users/2.webp";
import u3 from "../../../../assets/users/3.webp";
import u4 from "../../../../assets/users/4.webp";
import u5 from "../../../../assets/users/5.webp";
import u6 from "../../../../assets/users/6.webp";
import u7 from "../../../../assets/users/7.webp";
import u8 from "../../../../assets/users/8.webp";
import u9 from "../../../../assets/users/9.webp";
import u10 from "../../../../assets/users/10.webp";
import u11 from "../../../../assets/users/11.webp";
import u12 from "../../../../assets/users/12.webp";
import u13 from "../../../../assets/users/13.webp";
import u14 from "../../../../assets/users/14.webp";

const userIcons = [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10, u11, u12, u13, u14];

const userSizeFactor = 0.2;

export interface UserOnTableProps {
    order: number;
    name: string;
    active: boolean;
}

const UserOnTable: FC<UserOnTableProps> = memo(({ order, name, active }) => {
    return (
        <Stack
            className="taUserOnTable"
            direction="row"
            alignItems="center"
            gap={0.5}
            sx={{ transition: "opacity 0.5s", opacity: active ? 1 : 0.5 }}
            height="100%"
        >
            <img
                style={{
                    objectFit: "cover",
                    maxWidth: userSizeFactor * 350 + "px",
                    maxHeight: userSizeFactor * 480 + "px",
                    height: "100%",
                }}
                src={userIcons[order]}
                loading="lazy"
                alt={`Icon for user with order ${order}`}
            />
            <Typography
                variant="body2"
                width="70px"
                maxHeight={userSizeFactor * 480 + "px"}
                overflow="hidden"
                sx={{ wordBreak: "break-word" }}
            >
                {name}
            </Typography>
        </Stack>
    );
});

export { UserOnTable };
