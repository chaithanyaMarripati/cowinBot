import TelegramBot from "node-telegram-bot-api";
import { badRequestError } from "./errors";

export const sendDoc = async (chatId: number, doc: Buffer,bot:TelegramBot): Promise<void> => {
    try {
        await bot.sendDocument(chatId, doc, {});
    }
    catch (error) {
        console.log(error);
        throw new badRequestError("couldn't send pdf");
    }
}