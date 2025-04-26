import { FC, memo } from "react";

interface CardDeckProps {
    onThrowCard: (cardValue: string) => void;
}

const CardDeck: FC<CardDeckProps> = ({ onThrowCard }: CardDeckProps) => {
    console.log(onThrowCard)
    return <div>Deck</div>;
};

export default memo(CardDeck);
