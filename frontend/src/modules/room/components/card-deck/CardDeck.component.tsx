import { FC, memo, useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { PokerCard } from "../poker-card/PokerCard.component.tsx";
import { utils } from "@stswoon/shared";

const availableCardValues = [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 50, "?"];
const avCardsInit: { value: string | number; side: "front" | "back" }[] = availableCardValues.map((value) => {
    return { value, side: "back" };
}); //TODO: use PokerCardProps

export interface CardDeckProps {
    onThrowCard: (cardValue: number | string) => void;
}

const CardDeck: FC<CardDeckProps> = memo(({ onThrowCard }) => {
    const [avCards, setAvCards] = useState<typeof avCardsInit>(avCardsInit);

    //card rotate animation on init
    useEffect(() => {
        const avCardsCopy = utils.deepCopy(avCardsInit);
        avCardsCopy.forEach((card, index: number) => {
            setTimeout(
                () => {
                    card.side = "front";
                    setAvCards(utils.deepCopy(avCardsCopy));
                },
                100 + index * 100,
            );
        });
    }, []);

    return (
        <Stack
            className="taCardDeck"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
            gap={0}
            height="100%"
        >
            {avCards.map(({ value, side }) => (
                <Box
                    key={value}
                    sx={{
                        height: "50%",
                        width: "calc(12.5% - 4px)",
                        maxWidth: "120px",
                        margin: "2px",
                        zIndex: 1,
                        "&:hover": { transition: "transform .05s ease-in", transform: "translateY(-15px)" },
                    }}
                    onClick={() => onThrowCard(value)}
                >
                    <PokerCard value={value} side={side} />
                </Box>
            ))}
        </Stack>
    );
});

export { CardDeck };
