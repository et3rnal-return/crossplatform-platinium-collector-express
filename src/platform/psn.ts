import {GetAchievementsInput, PlatiniumTrophy} from "../types";
import {PlatformHandler} from "./platform";
import {exchangeCodeForAccessToken, exchangeNpssoForCode, getUserTitles} from "psn-api";

export class PSNHandler implements PlatformHandler {
    async getUserTrophies(input: GetAchievementsInput): Promise<PlatiniumTrophy[] | undefined> {

        const myNpsso = "wEZJ4jexlvYy3p1CN4oiY1yKDFttxCgmr8SRUsD4V7vR87SSqF3p4LFJXjFoHc6Z";
        const accessCode = await exchangeNpssoForCode(myNpsso);
        const authorization = await exchangeCodeForAccessToken(accessCode)
        const response = await getUserTitles(authorization, "me");
        console.log(response);
        return undefined;
    }

}