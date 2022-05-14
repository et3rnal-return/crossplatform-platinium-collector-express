import {GetAchievementsInput, PlatiniumTrophy} from "../types";

export abstract class PlatformHandler {
    abstract getUserTrophies(input: GetAchievementsInput): Promise<PlatiniumTrophy[] | undefined>;
}



