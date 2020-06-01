import Login from './login';
import ReactTestRenderer from 'react-test-renderer';
jest.mock('./login');

beforeEach(() => {
  Login.mockClear();
})

it('Check if Login called constructor class'), () => {
  const Login = new Login();
  expect(Login).toHaveBeenCalledTimes(1);
}

test('Checks if password matches fileld Matches the snapshot', () => {
  const props = {
    email: 'katarawater@gmail.com',
    password: 'qwerty'
  }

  const component = ReactTestRenderer.create(<Login {...props} />);

  expect(component.toJSON()).toMatchSnapshot();
})










// test("Mock test", () => {
//   const thisVal = true;

//   expect(thisVal == true);
// })

