import {GetAchievementsInput, PlatiniumTrophy} from "../types";

export abstract class PlatformHandler {
    abstract getUserTrophies(input: GetAchievementsInput): PlatiniumTrophy[];
}

export class PSNHandler implements PlatformHandler {
    getUserTrophies(input: GetAchievementsInput): PlatiniumTrophy[] {
        return [];
    }

}

export class SteamHandler implements PlatformHandler {
    getUserTrophies(input: GetAchievementsInput): PlatiniumTrophy[] {
        return [];
    }

}