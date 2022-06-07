import {GetAchievementsInput, PlatiniumTrophy} from "../types";
import {PlatformHandler} from "./platform";
import {
    exchangeCodeForAccessToken,
    exchangeNpssoForCode,
    exchangeRefreshTokenForAuthTokens,
    getUserTitles,
    makeUniversalSearch
} from "psn-api";
import {nppso} from "../nppso";

export class PSNHandler implements PlatformHandler {

    async getUserTrophies(input: GetAchievementsInput): Promise<PlatiniumTrophy[] | undefined> {

        const authorization = await this.getAuthorization();
        const universalSearchResponse = await makeUniversalSearch(
            authorization,
            input.id,
            "SocialAllAccounts"
        );

        if (!universalSearchResponse) {
            console.log("no universal search response")
            return undefined;
        }

        let accountID = input.id === "SingedSpinner" ? "me" : universalSearchResponse.domainResponses[0].results[0].socialMetadata.accountId;
        const response = await getUserTitles(authorization, accountID);
        if (!response || !response.trophyTitles) {
            console.log("no get user titles response")
            return undefined;
        }
        const trophies: PlatiniumTrophy[] = [];
        response.trophyTitles.forEach(i => {
            trophies.push({
                completionPercentage: i.progress,
                game: {name: i.trophyTitleName, imgSrc: i.trophyTitleIconUrl},
                timePlayed: "0"
            })
        })

        console.log(trophies);
        return trophies;
    }

    async getAuthorization() {
        const myNpsso = nppso;
        if(!myNpsso) {
            throw new Error("no nppso");
        }
        const accessCode = await exchangeNpssoForCode(myNpsso);
        const authorization = await exchangeCodeForAccessToken(accessCode);
        const now = new Date();
        const expirationDate = new Date(
            now.getTime() + authorization.expiresIn * 1000
        ).toISOString();

        const isAccessTokenExpired = new Date(expirationDate).getTime() < now.getTime();

        if (isAccessTokenExpired) {
            const updatedAuthorization = await exchangeRefreshTokenForAuthTokens(
                authorization.refreshToken
            );
            console.log(updatedAuthorization);
            return updatedAuthorization;
        }

        return authorization;
    }

}