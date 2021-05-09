import axios, { AxiosRequestConfig} from "axios"
import { badRequestError } from "../helper";
import { writeTxnIdToDb } from "./writeTxnId";
export const genOtp = async (mobileNum: string, apiEndpoint: string, chatId:number): Promise<void> => {
    try {
        const req = {
            url: apiEndpoint,
            method: "POST",
            data: {
                mobile: mobileNum
            }
        } as AxiosRequestConfig;
        const res = await axios(req);
        const txnId = res.data.txnId;
        if (!txnId) throw new badRequestError("could load txn id");
        //now store this txnid in database
        await writeTxnIdToDb(txnId, chatId);
    } catch (error) {   
        throw new badRequestError(error.message|| "cowin gen otp failed");
    }
}