import { dbName,dbCollection} from "../config";
import { getClient } from "../helper/getClient";
import { doc } from "../interface";
export const writeTxnIdToDb = async (txnId: string, chatId: number):Promise<void> => {
    const client = await getClient();
    const collection = client.db(dbName).collection(dbCollection);
    await collection.insertOne({ txnId: txnId, chatId: chatId, createdAt: new Date() });
}
export const checkChatId = async (chatId: number): Promise<any> => {
    const client = await getClient();
    const collection = client.db(dbName).collection(dbCollection);
    const result = await collection.findOne({ chatId: chatId});
    return result;
}
export const replaceDoc = async (doc:doc):Promise<void>=> {
    const client = await getClient();
    console.log(doc);
    const collection = client.db(dbName).collection(dbCollection);
    await collection.findOneAndReplace({ chatId:doc.chatId}, doc);
}