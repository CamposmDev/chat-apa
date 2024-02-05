
import mongoose from "mongoose";
import { MongooseUserDBM } from "./managers/index.js"
import MongooseMessageDBM from "./managers/MongooseMessageDBM.js";

class MongooseDB {
    #users;
    #messages;

    constructor() {
        this.#users = new MongooseUserDBM();
        this.#messages = new MongooseMessageDBM();
    }

    async connect(uri, options) {
        await mongoose.connect(uri, options).then(() => {
            console.info("connected to mongodb server")
        }).catch(err => {
            console.error(err.message);
        })
    }

    async close() {
        await mongoose.connection.close();
    }

    get users() { return this.#users }

    get messages() { return this.#messages }
}

export {
    MongooseDB
}