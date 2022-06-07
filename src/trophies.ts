import {GetAchievementsInput, Platform, platforms, platformValidation} from "./types";
import {PlatformHandler} from "./platform/platform";
import {SteamHandler} from "./platform/steam";
import {PSNHandler} from "./platform/psn";

const express = require('express');
const router = express.Router();
const port = process.env.PORT;

router.get('/', async (req: any, res: { send: (arg0: string) => void; }) => {

    const params = new URLSearchParams(req.query);
    const id = params.get("id");
    const platform = params.get("platform");

    if (!id || !platform) {
        res.send(JSON.stringify({"error": "Request needs to contain id and platform"}));
        return;
    }

    try {
        console.log(id, platform)
        const validPlatform = platformValidation(platform);
        const handler = getPlatformHandler(validPlatform);
        const response = await handler.getUserTrophies({id, platform: validPlatform});
        console.log(handler);
        console.log("response: ", response);
        res.send(JSON.stringify(response));
    } catch (e) {
        res.send(JSON.stringify(e));
        return;
    }
})


function getPlatformHandler(platform: Platform): PlatformHandler {
    switch (platform) {
        case "PSN":
            return new PSNHandler();

        case "Steam":
            return new SteamHandler();

        default:
            return new SteamHandler();
    }
}

module.exports = router;

