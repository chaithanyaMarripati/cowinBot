import TelegramBot from 'node-telegram-bot-api';
import { apiEndpoints } from '../config';
import { genOtp } from "../entities";
import { badRequestError } from "../helper";
export const echoCommand = (msg: TelegramBot.Message, match: RegExpExecArray | null, bot: TelegramBot) => {
  const chatId = msg.chat.id;
  try {
    if (!match) throw new badRequestError("enter text after echo");
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  }
  catch (error) {
    bot.sendMessage(chatId, error.message);
  }
  }

export const genOTPCommand = async (msg: TelegramBot.Message, match: RegExpExecArray | null, bot: TelegramBot) => {
  const chatId = msg.chat.id;
  try {
    if (!match) throw new Error("enter mobile number after / command");
    const mobileNum = match[1];
    if (mobileNum.length != 10)
      throw new badRequestError("enter a valid 10 digit mobile number");
    //now need to call the cowin api for this 
    //need to have a db with chat id as index 
    //and have txnid as prepouplated
    await genOtp(mobileNum,apiEndpoints.getOtp,chatId);
    bot.sendMessage(chatId, "otp sent to you mobile number , use /verOTP <otp> to verify otp");
  } catch (error) {
    bot.sendMessage(chatId, error.message || "genOTPCommand failed");
  }
}