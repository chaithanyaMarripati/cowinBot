import { cronByPinUseCase } from './src/useCases';
const cronJob = function () {
  //to do, get the pincode from the user
  const pinCode = '500059';
  cronByPinUseCase(pinCode)
    .then((res) => {
      if (res != null) {
        // you have stuff to
        // now you have the center values to pass to the variable
      }
    })
    .catch((err) => {
      //this error message has to sent to the user
      console.log(err);
      //to do display the error message back to the user
    });
};

while (true) {
  setTimeout(cronJob, 3600000);
}
