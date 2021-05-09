import dotenv from "dotenv";
dotenv.config();
import TelegramBot from 'node-telegram-bot-api';
import { botToken } from './config';
import {echoCommand,genOTPCommand} from "./useCases"
const bot = new TelegramBot(botToken as string, { polling: true });

// this responds to the /echo "message" command , gives back the message;
bot.onText(/\/echo (.+)/, (msg, match) => {
    echoCommand(msg, match, bot);
});
bot.onText(/\/genOTP (.+)/, async (msg, match) => {
    await genOTPCommand(msg, match, bot);
})
