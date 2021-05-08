import axios, { AxiosRequestConfig } from 'axios';
import { internalServerError, mapByPinRes } from '../helper';
import { cowinApiResponse } from '../interface';
export const getByPin = async (
  pin: string,
  apiEndpoint: string,
  date: string
): Promise<cowinApiResponse> => {
  try {
    const axiosReq = {
      url: apiEndpoint,
      method: 'GET',
      params: {
        pincode: pin,
        date: date,
      },
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
      },
    } as AxiosRequestConfig;
    const res = await axios(axiosReq);
    const apiResDate = res.data;
    const cowinApiRes = mapByPinRes(apiResDate);
    return cowinApiRes;
  } catch (error) {
    console.log(error);
    const message = 'get by pin cowin api faced an error' + error;
    throw new internalServerError(message);
  }
};
