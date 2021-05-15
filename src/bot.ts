import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";
import TelegramBot from 'node-telegram-bot-api';
import { botToken, mongoUri,welcomMessage } from './config';
import {echoCommand,genOTPCommand,verOTPCommand,getPdfCommand,subscribeCommand,deletePinCommand} from "./useCases"
const bot = new TelegramBot(botToken as string, { polling: true });

// this responds to the /echo "message" command , gives back the message;
bot.onText(/\/start/, async (msg) => {
    const chatId = msg.chat.id;
    await bot.sendMessage(chatId, welcomMessage);
 })
bot.onText(/\/echo (.+)/, (msg, match) => {
    echoCommand(msg, match, bot);
});
bot.onText(/\/genOTP (.+)/, async (msg, match) => {
    await genOTPCommand(msg, match, bot);
})
bot.onText(/\/verOTP (.+)/, async (msg, match) => {
    await verOTPCommand(msg, match, bot);
})
bot.onText(/\/getPdf/, async (msg, match) => {
    await getPdfCommand(msg, match, bot);
})
bot.onText(/\/subPin (.+)/, async (msg, match) => {
    await subscribeCommand(msg, match, bot);
})
bot.onText(/\/delPin/, async (msg, match) => {
    await deletePinCommand(msg, match, bot);
})
export const client = new MongoClient(mongoUri as string, { useNewUrlParser: true, useUnifiedTopology: true });