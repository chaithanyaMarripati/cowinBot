//this use case takes the pin code as input and
// for one hour makes an api call and gets the api response
// once started the current date will be used
import moment from 'moment';
import { apiEndpoints } from '../config';
import { getByPin } from '../entities';
import { internalServerError } from '../helper';
import { center } from '../interface';
export const cronByPinUseCase = async (
  pincode: string
): Promise<center | null> => {
  try {
    const date = new Date();
    const todayDate = moment(date).format('DD-MM-YYYY');
    const cowinRes = await getByPin(pincode, apiEndpoints.byPin, todayDate);
    //response is sent only if the centers length is greater than zero
    if (cowinRes.centers.length > 0) {
      cowinRes.centers.forEach((center) => {
        center.sessions.forEach((session) => {
          if (session.available_capacity > 0) return center;
        });
      });
    }
    return null;
  } catch (error) {
    const message = 'by pin cron job faced and error' + error;
    throw new internalServerError(message);
  }
};
