import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
const psn = require("psn-api");
const trophies = require('./src/trophies')
const cors = require("cors");
dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use('/trophies', trophies);
console.log(trophies)
app.get('/asd', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, async () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
    let f = await fetch('https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=440&count=3');
    let fx = await f.json();
    console.log(fx);
    // This is the value you copied from the previous step.
    // const myNpsso = "<64 character token>";
    // const {exchangeNpssoForCode} = psn;
// We'll exchange your NPSSO for a special access code.
//     const accessCode = await exchangeNpssoForCode("208dK8hf6L2XtckSW8j6tdDp8yzJnFafxHr1q4Or7fbyMvxzFIaL6RlJOKu7HBwr");
//     console.log(accessCode);
});

