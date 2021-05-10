import axios, { AxiosRequestConfig } from "axios";
import { createHash } from "crypto";
import { headers } from "../config";
import { badRequestError } from "../helper";
import { doc } from "../interface";
import { replaceDoc } from "./dbQueries";
export const verOtp = async (apiEndpoint: string, otp: string, doc:doc):Promise<void> => {
    try {
        const req = {
            url: apiEndpoint,
            method: "POST",
            data: {
                txnId: doc.txnId,
                otp: createHash("sha256").update(otp).digest("hex")
            },
            headers: headers
        
        } as AxiosRequestConfig;
        const res = await axios(req);
        const data = res.data;
        doc.token = data.token;
        doc.createdAt = new Date();
        await replaceDoc(doc);
    } catch (error) {
        console.log(error);
        throw new badRequestError("verification otp cowin api failed");
    }
}