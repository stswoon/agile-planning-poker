import { FC, memo, useEffect, useState } from "react";
import PockerCard from "./PockerCard.tsx";
import { Box, Stack } from "@mui/material";
import { deepCopy } from "../../utils/common.util.ts";

const availableCardValues = [0, 0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 50, "?"];
const avCardsInit = availableCardValues.map((value) => {
    return { value, cardBack: true };
});

export interface CardDeckProps {
    onThrowCard: (cardValue: number | string) => void;
}

const CardDeck: FC<CardDeckProps> = ({ onThrowCard }: CardDeckProps) => {
    const [avCards, setAvCards] = useState<typeof avCardsInit>(avCardsInit);

    useEffect(() => {
        //card rotate animation on init
        const avCardsCopy = deepCopy(avCardsInit);
        avCardsCopy.forEach((card, index: number) => {
            setTimeout(
                () => {
                    card.cardBack = false;
                    setAvCards(deepCopy(avCardsCopy));
                },
                1000 + index * 100,
            );
        });
    }, []);

    return (
        <Stack flexDirection="row" alignItems="center" justifyContent="center" flexWrap="wrap" gap={0}>
            {avCards.map(({ value, cardBack }) => {
                return (
                    <Box
                        sx={{ width: "calc(12.5% - 4px)", maxWidth: "144px", margin: "2px", zIndex: 1 }}
                        onClick={() => onThrowCard(value)}
                    >
                        <PockerCard
                            key={value}
                            value={value}
                            displayValue={value === 0.5 ? "½" : undefined}
                            cardBack={cardBack}
                        ></PockerCard>
                    </Box>
                );
            })}
        </Stack>
    );
};

export default memo(CardDeck);
