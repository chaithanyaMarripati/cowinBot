import { getByPin } from '../src/entities';
import { apiEndpoints } from '../src/config';
describe('testing the getByPin function', () => {
  test('get By Pin test', async () => {
    const data = await getByPin('500059', apiEndpoints.byPin, '08-05-2021');
    console.log(data);
    expect(data).toHaveProperty('centers');
  });
});
