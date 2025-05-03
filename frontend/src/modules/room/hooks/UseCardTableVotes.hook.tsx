import { UserAndVote } from "@stswoon/shared";
import { ReactNode, useMemo } from "react";
import { BoxAnimationUpDown } from "../components/card-table/BoxAnimationUpDown.component.tsx";
import { PokerCard, PokerCardEmpty } from "../components/poker-card/PokerCard.component.tsx";

export function useCardTableVotes(usersAndVotes: UserAndVote[], showCards: boolean) {
    const { votesUp, votesDown } = useMemo(() => {
        const result: { votesUp: ReactNode[]; votesDown: ReactNode[] } = {
            votesUp: [],
            votesDown: [],
        };
        usersAndVotes.forEach((userAndVote, index) => {
            const animationMode = index % 2 === 0 ? "up" : "down";
            const box = userAndVote.vote ? (
                <BoxAnimationUpDown animationMode={animationMode}>
                    <PokerCard
                        key={index}
                        value={userAndVote.vote.cardValue}
                        rotateAngle={userAndVote.vote.rotateAngle}
                        side={showCards ? "front" : "back"}
                    />
                </BoxAnimationUpDown>
            ) : (
                <PokerCardEmpty />
            );
            (index % 2 === 0 ? result.votesUp : result.votesDown).push(box);
        });
        return result;
    }, [showCards, usersAndVotes]);

    return { votesUp, votesDown };
}
