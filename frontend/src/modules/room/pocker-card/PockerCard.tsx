import { FC, memo } from "react";
import { Box, Typography } from "@mui/material";
import cardImg from "./card.webp";
import cardBackImg from "./card-back.webp";

export interface PokerCardProps {
    value: string | number;
    displayValue?: string;
    rotateAngle?: number;
    cardBack?: boolean;

    nonVisible?: number;
    showAnimation?: boolean;
    flipCardAnimation?: boolean;
}

const PokerCard: FC<PokerCardProps> = (props) => {
    return (
        <Box
            sx={{
                width: "144px",
                height: "192px",
            }}
        >
            {props.cardBack && (
                <Box className="pocker-card__back-side" sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            position: "absolute",
                            width: "144px",
                            height: "192px",
                        }}
                    >
                        <img
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                            src={cardBackImg}
                            loading="lazy"
                            alt={`Card with value ${props.value}`}
                        />
                    </Box>
                </Box>
            )}
            {!props.cardBack && (
                <Box className="pocker-card__front-side" sx={{ height: "100%" }}>
                    <Box
                        sx={{
                            position: "absolute",
                            width: "144px",
                            height: "192px",
                        }}
                    >
                        <img
                            style={{
                                objectFit: "cover",
                                width: "100%",
                                height: "100%",
                            }}
                            src={cardImg}
                            loading="lazy"
                            alt={`Card with value ${props.value}`}
                        />
                    </Box>
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
                        <Typography variant="h1" fontWeight="bold">
                            {props.displayValue ?? props.value}
                        </Typography>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default memo(PokerCard);
