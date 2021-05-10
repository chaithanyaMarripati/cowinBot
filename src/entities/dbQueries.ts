import { dbName,dbCollection,} from "../config";
import { getClient } from "../helper/getClient";
import { doc } from "../interface";
export const writeTxnIdToDb = async (txnId: string, chatId: number):Promise<void> => {
    const client = await getClient();
    const collection = client.db(dbName).collection(dbCollection);
    await collection.insertOne({ txnId: txnId, chatId: chatId, createdAt: new Date() });
}
export const checkChatId = async (chatId: number,givenCollection?:string): Promise<any> => {
    const client = await getClient();
    const collection = client.db(dbName).collection(givenCollection||dbCollection);
    const result = await collection.findOne({ chatId: chatId});
    return result;
}
export const replaceDoc = async (doc:doc):Promise<void>=> {
    const client = await getClient();
    const collection = client.db(dbName).collection(dbCollection);
    await collection.findOneAndReplace({ chatId:doc.chatId}, doc);
}

export const postDocToDb = async (doc: any, givenCollection: string): Promise<void> => {
    const client = await getClient();
    const collection = client.db(dbName).collection(givenCollection);
    await collection.insertOne(doc);
}

export const deleteRecord = async (doc: any, givenCollection: string) => {
    const client = await getClient();
    const collection = client.db(dbName).collection(givenCollection);
    await collection.deleteOne({ _id: doc._id });
}