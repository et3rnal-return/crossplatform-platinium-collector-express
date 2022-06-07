import {GetAchievementsInput, PlatiniumTrophy, SteamAchievement, SteamGame, SteamGameData} from "../types";
import {PlatformHandler} from "./platform";


export class SteamHandler implements PlatformHandler {
    async getUserTrophies(input: GetAchievementsInput): Promise<PlatiniumTrophy[] | undefined> {
        try {


            const games = await this.getUserGames(input);
            const platinumTrophies: PlatiniumTrophy[] = [];
            const gamesTrophies: (SteamGame & SteamGameData)[] = [];
            for (const i of games) {
                const achivements = await this.getUserGameTrophy(input, i.appid);
                gamesTrophies.push({...achivements, ...i});
            }

            for (const game of gamesTrophies) {
                if (!game.success || !game.achievements) {
                    continue;
                }
                let completed = 0;
                for (const value of Object.values(game.achievements)) {
                    completed += value.achieved;
                }

                platinumTrophies.push({
                    completionPercentage: completed / game.achievements.length,
                    game: {
                        name: game.name,
                        imgSrc: `http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`
                    },
                    timePlayed: game.playtime_forever.toString()
                })
            }

            return platinumTrophies;

        } catch (e) {
            console.log(e);
            return undefined;
        }
    }

    async getUserGameTrophy(input: GetAchievementsInput, appid: string): Promise<SteamGameData> {
        const key = process.env.STEAM_KEY;
        const achivements = await fetch(`https://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=${appid}&key=${key}&steamid=${input.id}`,
            {
                headers: {
                    'Accept': "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive",
                    "Host": "api.steampowered.com"
                }
            }).then(i => i.json())

        if (!achivements.playerstats) {
            throw new Error("[STEAM] Error while fetching game achievements!");
        }
        return achivements.playerstats;
    }

    async getUserGames(input: GetAchievementsInput): Promise<SteamGame[]> {
        const key = process.env.STEAM_KEY;
        const url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${key}&steamid=${input.id}&include_appinfo=true&format=json`
        const games = await fetch(url,
            {
                headers: {
                    'Accept': "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive",
                    "Host": "api.steampowered.com"
                }
            }).then(i => i.json())

        if (!games?.response?.games) {
            throw new Error("[STEAM] Error while fetching user games!");
        }
        return games.response.games;
    }

}