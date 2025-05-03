import { FC, memo } from "react";
import { Box, Typography } from "@mui/material";
import cn from "classnames";

import cardFrontImg from "../../../../assets/CardFront.webp";
import cardBackImg from "../../../../assets/CardBack.webp";

const cardSizeFactor = 0.15;
const cardSizes = { width: cardSizeFactor * 720 + "px", height: cardSizeFactor * 960 + "px" };

export interface PokerCardProps {
    value: string | number;
    side: "front" | "back";
    rotateAngle?: number;
}

const PokerCardEmpty: FC = memo(() => {
    return <Box className="taPokerCardEmpty" sx={{ ...cardSizes }} />;
});

const PokerCard: FC<PokerCardProps> = memo(({ value, side, rotateAngle }) => {
    const displayValue = value === 0.5 ? "½" : value + "";
    return (
        <Box className="taPokerCard">
            <PokerCardWithAngle text={displayValue} side={side} rotateAngle={rotateAngle} />
        </Box>
    );
});

interface PokerCardInnerProps {
    text: string;
    side: "front" | "back";
    rotateAngle?: number;
}

const PokerCardWithAngle: FC<PokerCardInnerProps> = memo((props) => {
    return (
        <Box
            className="taPokerCardWithAngle"
            sx={{ transition: "transform 0.1s", transform: `rotate(${props.rotateAngle}deg)` }}
        >
            <PokerCardWithAnimation {...props} />
        </Box>
    );
});

const backFrontStyles = {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
};

const PokerCardWithAnimation: FC<PokerCardInnerProps> = memo(({ text, side }) => {
    return (
        <Box className={"poker-card__perspective"} sx={{ perspective: "1000px", ...cardSizes }}>
            <Box
                className={cn("poker-card__card", { _flipped: side === "back" })}
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.8s",
                    "&._flipped": { transform: "rotateY(180deg)" },
                }}
            >
                <Box className="poker-card__front" sx={backFrontStyles}>
                    <PokerCardBase text={text} side="front" />
                </Box>
                <Box className="poker-card__back" sx={{ transform: "rotateY(180deg)", ...backFrontStyles }}>
                    <PokerCardBase text={text} side="back" />
                </Box>
            </Box>
        </Box>
    );
});

const PokerCardBase: FC<PokerCardInnerProps> = memo(({ text, side }) => {
    return (
        <Box className="taPokerCardInner" sx={cardSizes}>
            <Box sx={{ position: "absolute", ...cardSizes }}>
                <img
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                    }}
                    src={side === "back" ? cardBackImg : cardFrontImg}
                    loading="lazy"
                    alt={`Card with value ${text}`}
                />
            </Box>
            {side === "front" && (
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography variant="h2" fontWeight="bold">
                        {text}
                    </Typography>
                </Box>
            )}
        </Box>
    );
});

export { PokerCard, PokerCardEmpty };
