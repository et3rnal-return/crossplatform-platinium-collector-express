const express  = require('express');
const router = express.Router();
const port = process.env.PORT;

router.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send('Birds home page')
})

router.get('/trophies', async (req: any, res: { send: (arg0: any) => void; }) => {
    try {
        res.send("xd");
    } catch(err) {
        console.log(err);
    }
})

module.exports = router;

