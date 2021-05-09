import request from "request-promise";
import { badRequestError } from "./errors";
export const sendDoc = async (chatId: number, doc: Buffer): Promise<void> => {
    try {
        const api = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendDocument`;
        const options = {
            'method': 'POST',
            'url': api,
            'headers': {
            },
            formData: {
                'chat_id': chatId,
                'document': {
                    'value': doc,
                    'options': {
                        'filename': `${chatId}.pdf`,
                        'contentType': "application/pdf"
                    }
                }
            }
        };
        await request(options);
    }
    catch (error) {
        console.log(error);
        throw new badRequestError("couldn't send pdf");
    }
}