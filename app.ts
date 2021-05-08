import { cronByPinUseCase } from './src/useCases';
import { schedule } from 'node-cron';
const cronJob = async () => {
  console.log('started exe');
  //to do, get the pincode from the user
  const pinCode = '500059';
  const data = await cronByPinUseCase(pinCode);
  if (!data) {
    console.log(data);
  }
  console.log('done ');
};

// this will the schedule the cronJob to run for every hour
schedule('* * * *', async () => {
  await cronJob();
});
