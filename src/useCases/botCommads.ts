import TelegramBot from 'node-telegram-bot-api';
import { apiEndpoints } from '../config';
import { genOtp, getPdf, verOtp } from "../entities";
import { checkChatId } from '../entities/dbQueries';
import { badRequestError,mapDoc} from "../helper";
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

export const verOTPCommand = async (msg: TelegramBot.Message, match: RegExpExecArray | null, bot: TelegramBot) => {
  const chatId = msg.chat.id;
  try {
    if (!match) throw new  badRequestError("enter a valid otp");
    const otp = match[1];
    if (!otp) throw new badRequestError("enter a valid otp");
    //now we need to check if the chat id is present in the db 
    //if not we throw otp expired error
    //if its present then we take the txnid from the db, and otp from the user and make a call to get the token 
    //if everything is success, we store the token in the db
    const record = await checkChatId(chatId);
    const doc = mapDoc(record);
    if (!record || !doc.txnId)
      throw new badRequestError("otp may have expired, please authorize again");
    await verOtp(apiEndpoints.verOtp,otp,doc);
    bot.sendMessage(chatId,"otp verified, use the other commands for next 5 mins ");
  } catch (error) {
    bot.sendMessage(chatId, error.message || "verOTPCommand failed");
  }
}

export const getPdfCommand = async (msg:TelegramBot.Message,match:RegExpExecArray | null ,bot: TelegramBot) => {
  // this is for getting the first dose vaccine report
  const chatId = msg.chat.id;
  try {
    const bufferPdf = await getPdf(chatId, apiEndpoints.getPdf);
    bot.sendMessage(chatId, "sending the pdf document,please wait");
    await bot.sendDocument(chatId, bufferPdf, {}, { filename: `${chatId}.pdf`, contentType: "application/pdf" });
  } catch (error) {
    bot.sendMessage(chatId, error.message || "get pdf cowin api failed");
  }
}