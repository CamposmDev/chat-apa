import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import { WebSocketServer } from "ws";
import { parseToken, refreshOnlineClients, initConnectionTimer, initMessageHandler } from "./express/middleware/Util.js"

dotenv.config();

if (!process.env.DB_URL) {
    console.log("Missing 'DB_URL' field")
    process.exit(1)
}
if (!process.env.ORIGIN) {
    console.log("Missing 'ORIGIN' field")
    process.exit(1)
}
if (!process.env.PORT) {
    console.log("Missing 'PORT' field")
    process.exit(1)
}
if (!process.env.JWT_SECRET) {
    console.log ("Missing 'JWT_SECRET' field")
}

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: [process.env.ORIGIN],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

import { ApiRouter } from "./express/routers/index.js"

app.get('/', (req, res) => {
    return res.status(400).send('Bad Request 400');
})

app.use("/api", ApiRouter)

import db from "./database/index.js"
import JWTAuth from "./express/middleware/JWTAuth.js";

/* initialize server */
const server = app.listen(process.env.PORT, () => {
    db.connect(process.env.DB_URL);
    console.info('server listening on port ' + process.env.PORT)
});

const wss = new WebSocketServer({server})
wss.on('connection', (conn, req) => {
    const tokenValue = parseToken(req.headers.cookie)
    if (tokenValue) {
        const auth = new JWTAuth()
        auth.verify(tokenValue, (err, data) => {
            if (err) console.log(err)
            else {
                const userId = data;
                conn.userId = userId;
            }
        })
    }

    initConnectionTimer(conn, wss);
    initMessageHandler(conn)
    refreshOnlineClients(wss);
})