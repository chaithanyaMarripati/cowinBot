export const apiEndpoints = {
  byPin:
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin",
  byDistrict: "/v2/appointment/sessions/public/calendarByDistrict",
  getOtp: "https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP",
  verOtp: "https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP",
  getPdf:"https://cdn-api.co-vin.in/api/v2/registration/certificate/public/download"
};
export const botToken = process.env.BOT_TOKEN;
export const dbName = "cowinBot"
export const dbCollection = "cowinCollection";
export const headers = {
  "accept": "application/json",
  "Content-type": "application/json",
  'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'
}
export const mongoUri = process.env.MONGO_URI;
export const collections = {
  userAuthCollection: "cowinCollection",
  cronJobCollection:"cronCollection"
}