export type UserAction<T> = {
    type: "flipCards" | "clearCards" | "vote" | "changeName"
    payload: T
};

//TODO different UserAction