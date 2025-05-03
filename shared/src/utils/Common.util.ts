const now = (): number => (new Date()).getTime();

const deepCopy = <T>(o: T): T => JSON.parse(JSON.stringify(o));

const capitalizeFirstLetter = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);


export const utils = {
    now,
    deepCopy,
    capitalizeFirstLetter
};