export const apiEndpoints = {
  byPin:
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin",
  byDistrict: "/v2/appointment/sessions/public/calendarByDistrict",
  getOtp:"https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP"
};
export const botToken = process.env.BOT_TOKEN;
export const dbName = "cowinBot"
export const dbCollection = "cowinCollection";