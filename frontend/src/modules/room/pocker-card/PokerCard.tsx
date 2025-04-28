import { FC, memo } from "react";
import { Box, Typography } from "@mui/material";
import classNames from "classNames";
import cardFrontImg from "./card-front.webp";
import cardBackImg from "./card-back.webp";

const cardSize = { width: "108px", height: "142px" };

export interface PokerCardProps {
    value: string | number;
    displayValue?: string;
    rotateAngle?: number;
    cardBack?: boolean;

    nonVisible?: number;
    showAnimation?: boolean;
    flipCardAnimation?: boolean;
}

const PokerCardWithAngle: FC<PokerCardProps> = memo((props) => {
    return (
        <Box className="taPokerCardFinal" sx={{ transform: `rotate(${props.rotateAngle}deg)` }}>
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

const PokerCardWithAnimation: FC<PokerCardProps> = memo((props) => {
    return (
        <Box className={"poker-card__perspective"} sx={{ perspective: "1000px", ...cardSize }}>
            <Box
                className={classNames("poker-card__card", { _flipped: !!props.cardBack })}
                sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    transition: "transform 0.8s",
                    transformStyle: "preserve-3d",
                    "&._flipped": {
                        transform: "rotateY(180deg)",
                    },
                }}
            >
                <Box className="poker-card__front" sx={backFrontStyles}>
                    <PokerCardInnerSide label={props.displayValue ?? props.value + ""} />
                </Box>
                <Box
                    className="poker-card__back"
                    sx={{
                        transform: "rotateY(180deg)",
                        ...backFrontStyles,
                    }}
                >
                    <PokerCardInnerSide />
                </Box>
            </Box>
        </Box>
    );
});

const PokerCardInnerSide: FC<{ label?: string }> = memo(({ label }) => {
    return (
        <Box className="taPokerCardInner" sx={cardSize}>
            <Box sx={{ position: "absolute", ...cardSize }}>
                <img
                    style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                    }}
                    src={!label ? cardBackImg : cardFrontImg}
                    loading="lazy"
                    alt={`Card with value ${label}`}
                />
            </Box>
            {!!label && (
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
                        {label}
                    </Typography>
                </Box>
            )}
        </Box>
    );
});

const PokerCardFinal: FC<PokerCardProps> = memo((props) => {
    return (
        <Box className="taPokerCardFinal">
            <PokerCardWithAngle {...props} />
        </Box>
    );
});

export { PokerCardFinal as PokerCard };
