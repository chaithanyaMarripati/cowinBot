import axios, { AxiosRequestConfig } from "axios"
import { badRequestError, mapDoc } from "../helper";
import { checkChatId } from "./dbQueries";
import jwtDecode from "jwt-decode";
import { headers } from "../config";
export const getPdf = async (chatId: number, apiEndpoint: string): Promise<Buffer> => {
    const record = await checkChatId(chatId);
    if (!record)
        throw new badRequestError("record not found, please authorize again");
    const doc = mapDoc(record);
    if (!doc.token)
        throw new badRequestError("token not found, please authorize again");
    //now decode the token and get the benficiary id 
    const token = doc.token;
    const decodedToken = jwtDecode(token) as any;
    const benficiaryId = decodedToken.beneficiary_reference_id;

    //make the axios request and get the buffer of the result 

    const req = {
        url: apiEndpoint,
        responseType:"arraybuffer",
        method: "GET",
        params: {
            beneficiary_reference_id :benficiaryId
        },
        headers: {
            ...headers,
            Authorization:`Bearer ${token}`
        }
    } as AxiosRequestConfig;
    const res = await axios(req);
    return res.data;
}