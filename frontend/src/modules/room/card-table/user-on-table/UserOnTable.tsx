import { FC, memo } from "react";
import { Stack, Typography } from "@mui/material";

import u1 from "./img/1.webp";
import u2 from "./img/2.webp";
import u3 from "./img/3.webp";
import u4 from "./img/4.webp";
import u5 from "./img/5.webp";
import u6 from "./img/6.webp";
import u7 from "./img/7.webp";
import u8 from "./img/8.webp";
import u9 from "./img/9.webp";
import u10 from "./img/10.webp";
import u11 from "./img/11.webp";
import u12 from "./img/12.webp";
import u13 from "./img/13.webp";
import u14 from "./img/14.webp";

const userIcons = [u1, u2, u3, u4, u5, u6, u7, u8, u9, u10, u11, u12, u13, u14];

export interface UserOnTableProps {
    order: number;
    name: string;
}

const UserOnTable: FC<UserOnTableProps> = ({ order, name }) => {
    const factor = 0.3;
    return (
        <Stack direction="row">
            <img
                style={{
                    objectFit: "cover",
                    width: factor * 350 + "px",
                    height: factor * 480 + "px",
                }}
                src={userIcons[order]}
                loading="lazy"
                alt={`Icon for user with order ${order}`}
            />
            <Typography>{name}</Typography>
        </Stack>
    );
};

export default memo(UserOnTable);
