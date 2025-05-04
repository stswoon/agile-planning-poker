import { UserAndVote } from "@stswoon/shared";
import { ReactNode, useMemo } from "react";
import { BoxAnimationUpDown } from "../components/card-table/BoxAnimationUpDown.component.tsx";
import { UserOnTable } from "../components/card-table/UserOnTable.component.tsx";

export function useCardTableUsers(usersAndVotes: UserAndVote[]) {
    const { usersUp, usersDown } = useMemo(() => {
        const result: { usersUp: ReactNode[]; usersDown: ReactNode[] } = {
            usersUp: [],
            usersDown: [],
        };
        usersAndVotes.forEach((userAndVote, index) => {
            const userOnTable = (
                <UserOnTable name={userAndVote.user.name} order={index} active={userAndVote.user.active} />
            );
            if (index % 2 === 0) {
                const box = (
                    <BoxAnimationUpDown key={"user_" + index} animationMode="up">
                        {userOnTable}
                    </BoxAnimationUpDown>
                );
                result.usersUp.push(box);
            } else {
                const box = (
                    <BoxAnimationUpDown key={"user_" + index} animationMode="down">
                        {userOnTable}
                    </BoxAnimationUpDown>
                );
                result.usersDown.push(box);
            }
        });
        return result;
    }, [usersAndVotes]);

    return { usersUp, usersDown };
}
