"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const { dbName } = config_1.config;
const MONGO_URL = `mongodb://localhost:27017/${dbName}`;
const mongoStart = async () => {
    try {
        mongoose_1.default.connect(MONGO_URL, {
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', () => console.log('DB connected'));
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.default = mongoStart;
