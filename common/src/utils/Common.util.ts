export const utils = {
    now: (): number => {
        const d = new Date();
        return d.getTime();
    },

    deepCopy: <T>(o: T): T => JSON.parse(JSON.stringify(o))
};
