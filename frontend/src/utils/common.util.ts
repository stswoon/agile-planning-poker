export const capitalizeFirstLetter = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

export const deepCopy = <T>(obj: T) => JSON.parse(JSON.stringify(obj)) as T;
