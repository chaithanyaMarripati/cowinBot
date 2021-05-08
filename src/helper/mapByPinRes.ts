import { cowinApiResponse } from "../interface";
export const mapByPinRes = (data: any): cowinApiResponse => {
  return {
    centers: data.centers,
  } as cowinApiResponse;
};
