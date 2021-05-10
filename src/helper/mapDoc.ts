import { doc, pinCode } from "../interface";
export const mapDoc = (data: any): doc => {
    return {
        _id: data._id,
        chatId: data.chatId,
        txnId: data.txnId,
        token: data.token
    } as doc;
}
export const mapByCronDoc = (data: any): pinCode => {
    return {
        _id: data._id,
        chatId: data.chatId,
        pinCode:data.pinCode
    } as pinCode;
 }