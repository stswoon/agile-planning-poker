import { uniqueNamesGenerator, adjectives, colors, animals, starWars } from "unique-names-generator";
import { capitalizeFirstLetter } from "./common.util.ts";
import shortUuid from "short-uuid";

export const getRandomRoomId = (): string =>
    uniqueNamesGenerator({
        dictionaries: [colors, animals],
        separator: "-",
        length: 2,
    });

export const getRandomUserName = (): string =>
    capitalizeFirstLetter(
        uniqueNamesGenerator({
            dictionaries: [adjectives, starWars],
            separator: " ",
            length: 2,
        }),
    );

// export const getRandomUserId = (): string => crypto.randomUUID();
export const getRandomUserId = (): string => shortUuid.generate();
