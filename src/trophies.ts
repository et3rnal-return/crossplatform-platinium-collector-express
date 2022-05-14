import {GetAchievementsInput, Platform} from "./types";
import {PlatformHandler} from "./platform/platform";
import {SteamHandler} from "./platform/steam";
import {PSNHandler} from "./platform/psn";

const express = require('express');
const router = express.Router();
const port = process.env.PORT;

router.get('/', async (req: any, res: { send: (arg0: string) => void; }) => {
    if (!req.body.id && !req.body.platform) {
        res.send(JSON.stringify({"error": "Request needs to contain id and platform"}));
        return;
    }
    const data = req.body as GetAchievementsInput;
    const handler = getPlatformHandler('PSN');
    handler.getUserTrophies(req.body);
    res.send('Birds home page')
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

