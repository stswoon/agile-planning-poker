import { UserAndVote } from "shared";
import { ReactNode, useMemo } from "react";
import { BoxAnimationUpDown } from "../components/card-table/BoxAnimationUpDown.component.tsx";
import { PokerCard } from "../components/poker-card/PokerCard.component.tsx";
import { Box } from "@mui/material";

export function useCardTableVotes(usersAndVotes: UserAndVote[], showCards: boolean) {
    const { votesUp, votesDown } = useMemo(() => {
        const result: { votesUp: ReactNode[]; votesDown: ReactNode[] } = {
            votesUp: [],
            votesDown: [],
        };
        usersAndVotes.forEach((userAndVote, index) => {
            const cardOnTable = userAndVote.vote && (
                <PokerCard
                    key={index}
                    value={userAndVote.vote.cardValue ?? 0}
                    rotateAngle={userAndVote.vote.rotateAngle}
                    side={showCards ? "front" : "back"}
                />
            );

            if (index % 2 === 0) {
                if (cardOnTable) {
                    const box = <BoxAnimationUpDown animationMode="up">{cardOnTable}</BoxAnimationUpDown>;
                    result.votesUp.push(box);
                } else {
                    const box = <Box className="taEmptyVote" />;
                    result.votesUp.push(box);
                }
            } else {
                if (cardOnTable) {
                    const box = <BoxAnimationUpDown animationMode="down">{cardOnTable}</BoxAnimationUpDown>;
                    result.votesDown.push(box);
                } else {
                    const box = <Box className="taEmptyVote" />;
                    result.votesDown.push(box);
                }
            }
        });
        return result;
    }, [showCards, usersAndVotes]);

    return { votesUp, votesDown };
}
