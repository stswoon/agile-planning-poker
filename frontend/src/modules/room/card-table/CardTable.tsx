import { memo } from "react";
import { Stack } from "@mui/material";

import leftImg from "./left.webp";
import centerImg from "./center.webp";
import rightImg from "./right.webp";

const CardTable = () => {
    const factorHeight = 0.5;
    return (
        <Stack direction="row">
            <img
                style={{
                    objectFit: "cover",
                    width: factorHeight * 585 + "px",
                    height: factorHeight * 919 + "px",
                }}
                src={leftImg}
                loading="lazy"
                alt={"Left table part"}
            />
            <img
                style={{
                    //objectFit: "cover",
                    //width: factorHeight * 257 * 4 + "px",
                    width: "100%",
                    height: factorHeight * 918 + "px",
                }}
                src={centerImg}
                loading="lazy"
                alt={"Center table part"}
            />
            <img
                style={{
                    objectFit: "cover",
                    width: factorHeight * 587 + "px",
                    height: factorHeight * 917 + "px",
                }}
                src={rightImg}
                loading="lazy"
                alt={"Right table part"}
            />
        </Stack>
    );
};

export default memo(CardTable);
