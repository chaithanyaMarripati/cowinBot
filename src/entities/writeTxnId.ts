import { MongoClient } from "mongodb";
import { badRequestError } from "../helper";
const mongoUri = process.env.MONGO_URI;
import { dbName,dbCollection } from "../config";
export const writeTxnIdToDb = async (txnId: string, chatId: number):Promise<void> => {
    if (!mongoUri) throw new badRequestError("mongo uri not specified");
    const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    const collection = client.db(dbName).collection(dbCollection);
    await collection.insertOne({ txnId: txnId, chatId: chatId,createdAt:new Date()});
}