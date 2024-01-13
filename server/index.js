import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'

dotenv.config();
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

/* initialize server */
app.listen(process.env.PORT, () => {
    db.connect(process.env.DB_URL);
    console.info('server listening on port ' + process.env.PORT)
});