const express = require('express');
const router = express.Router();
const port = process.env.PORT;

router.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
    if (!req.body.id && !req.body.platform) {
        res.send(JSON.stringify({"error": "Request needs to contain id and platform"}));
        return;
    }
    const data = req.body as GetAchievementsInput;
    console.log(data);
    res.send('Birds home page')
})


module.exports = router;

