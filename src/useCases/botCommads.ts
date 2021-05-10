import TelegramBot from 'node-telegram-bot-api';
import { apiEndpoints,collecitons} from '../config';
import { genOtp, getPdf, verOtp,checkChatId, postDocToDb } from "../entities";
import { badRequestError, mapDoc, sendDoc } from "../helper";
import { pinCode } from "../interface";
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
  console.log("this is the chat id", chatId);
  try {
    const data = await getPdf(chatId, apiEndpoints.getPdf);
    console.log("got the data buffer");
    bot.sendMessage(chatId, "sending the pdf document,please wait");
    console.log(data);
    await sendDoc(chatId,data);
    //await bot.sendDocument(chatId, data, {}, { filename: `${chatId}.pdf`, contentType: "application/pdf"});
  } catch (error) {
    bot.sendMessage(chatId, error.message || "get pdf cowin api failed");
  }
}

export const subscribeCommand = async (msg: TelegramBot.Message, match: RegExpExecArray | null, bot: TelegramBot): Promise<void> => {
  const chatId = msg.chat.id;
  console.log("subscribeCommand got hit");
  try {
    //road map 
    // when a user wants to subscribe for the vaccine in his area
    // 1) first check if the user has already subsribed ? throw error:add it to the db 
    // 2) each user can have only one pincode he can search for 
    // 3) send a message that pincode has been entered in db, if vaccine is available, chat will be updated
    
    //1) checking if the user has a pincode already present 
    const present = await checkChatId(chatId, collecitons.cronJobCollection);
    if (present) {
      bot.sendMessage(chatId, "pinCode already present, use /delPin to delete the pin");
      return;
    }
    if (!match || !match[1] || match[1].length!=6) {
      bot.sendMessage(chatId, "enter valid 6 digit pincode");
      return;
    }
    const pinCode = match[1];
    //2) inserting the pin into the collection
    const record: pinCode = {
      chatId: chatId,
      pinCode:pinCode
    }
    await postDocToDb(record, collecitons.cronJobCollection);
    bot.sendMessage(chatId, "pinCode saved successfully, you will be notified if vaccine becomes available");
  } catch (error) {
    console.log(error);
    bot.sendMessage(chatId, error.message || "subscribe command failed");
  }
}