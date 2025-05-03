import { uniqueNamesGenerator, adjectives, colors, animals, starWars } from "unique-names-generator";
import shortUuid from "short-uuid";
import { utils } from "@stswoon/shared";

export const getRandomRoomId = (): string =>
    uniqueNamesGenerator({
        dictionaries: [colors, animals],
        separator: "-",
        length: 2,
    });

export const getRandomUserName = (): string =>
    utils.capitalizeFirstLetter(
        uniqueNamesGenerator({
            dictionaries: [adjectives, starWars],
            separator: " ",
            length: 2,
        }),
    );

export const getRandomShortId = (): string => shortUuid.generate();

// export const getRandomUuid = (): string => crypto.randomUUID();
