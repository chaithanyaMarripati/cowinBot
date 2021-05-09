import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import TelegramBot from 'node-telegram-bot-api';
import { botToken, mongoUri } from './config';
import {echoCommand,genOTPCommand,verOTPCommand} from "./useCases"
const bot = new TelegramBot(botToken as string, { polling: true });

// this responds to the /echo "message" command , gives back the message;
bot.onText(/\/echo (.+)/, (msg, match) => {
    echoCommand(msg, match, bot);
});
bot.onText(/\/genOTP (.+)/, async (msg, match) => {
    await genOTPCommand(msg, match, bot);
})
bot.onText(/\/verOTP (.+)/, async (msg, match) => {
    await verOTPCommand(msg, match, bot);
})

export const client = new MongoClient(mongoUri as string, { useNewUrlParser: true, useUnifiedTopology: true });