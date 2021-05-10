export interface doc {
    _id: string;
    txnId: string;
    chatId: number;
    token?: string;
    createdAt?: Date;
}
export interface pinCode {
    _id?: string;
    chatId: number;
    pinCode: string;
}