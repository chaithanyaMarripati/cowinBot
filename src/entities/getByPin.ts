import axios, { AxiosRequestConfig } from 'axios';
import { headers } from '../config';
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
      headers: headers,
    } as AxiosRequestConfig;
    const res = await axios(axiosReq);
    const apiResDate = res.data;
    const cowinApiRes = mapByPinRes(apiResDate);
    return cowinApiRes;
  } catch (error) {
    const message = 'get by pin cowin api faced an error' + error;
    throw new internalServerError(message);
  }
};
