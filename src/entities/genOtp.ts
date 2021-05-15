import axios, { AxiosRequestConfig} from "axios"
import { collections, headers } from "../config";
import { badRequestError } from "../helper";
import { doc } from "../interface";
import { writeToDb } from "./dbQueries";
export const genOtp = async (mobileNum: string, apiEndpoint: string, chatId:number): Promise<void> => {
    try {
        const req = {
            url: apiEndpoint,
            method: "POST",
            data: {
                mobile: mobileNum
            },
            headers: headers
        } as AxiosRequestConfig;
        const res = await axios(req);
        const txnId = res.data.txnId;
        if (!txnId) throw new badRequestError("could load txn id");
        //now store this txnid in database
        const doc: doc = {
            chatId: chatId,
            txnId: txnId,
            createdAt: new Date(),
        };
        console.log("otps are fine");
        await writeToDb(doc, collections.userAuthCollection);
    } catch (error) {   
        throw new badRequestError(error.message|| "cowin gen otp failed");
    }
}