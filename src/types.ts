export type Platform = "PSN" | "Steam";

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