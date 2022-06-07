export const platforms = ['PSN', 'Steam'] as const;
export type Platform = typeof platforms[number];

export function platformValidation(platform: string): Platform {
    const validPlatform = platforms.find((validPlatform) => validPlatform === platform);
    if (validPlatform) {
        return validPlatform;
    }
    throw Error("Invalid platform, available platforms are " + platforms);
}


export type GetAchievementsInput = {
    id: string,
    platform: Platform;
}

export type GameData = {
    name: string;
    imgSrc: string;
};

export type PlatiniumTrophy = {
    game: GameData;
    timePlayed: string;
    completionPercentage: number;
};


export type SteamGame = {
    appid: string;
    name: string;
    img_icon_url: string;
    img_logo_url: string;
    playtime_forever: number;
    playtime_windows_forever: number;
    playtime_mac_forever: number;
    playtime_linux_forever: number;
}

export type SteamGameData = {
    steamID: string;
    gameName: string;
    achievements: SteamAchievement[];
    success: boolean;
}

export type SteamAchievement = {
    apiname: string;
    achieved: number;
    unlocktime: number;
}