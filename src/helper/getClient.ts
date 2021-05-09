import { client } from "../bot";
export const getClient =async () => {
    if (client.isConnected()) {
        console.log("mongo client connected");
        return client;
    };
    console.log("connecting for the first time");
    await client.connect();
    return client;
}