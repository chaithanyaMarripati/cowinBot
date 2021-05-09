import { doc } from "../interface";
export const mapDoc = (data: any): doc => {
    return {
        _id: data._id,
        chatId: data.chatId,
        txnId: data.txnId,
        token: data.token
    } as doc;
}