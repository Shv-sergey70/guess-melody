import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {AuthorizationScreen} from "./authorization-screen";

configure({adapter: new Adapter()});

test(`Authorization screen success changes form fields and submits form`, () => {
  const onEmailChangeMock = jest.fn();
  const onPasswordChangeMock = jest.fn();
  const preventDefault = jest.fn();
  const loginMock = jest.fn();

  const authorizationScreen = shallow(
      <AuthorizationScreen
        email="myEmail@email.com"
        password="myPassword"
        onEmailChange={onEmailChangeMock}
        onPasswordChange={onPasswordChangeMock}
        login={loginMock}
        isDisabled={false} />
  );

  authorizationScreen.find(`#email`).simulate(`change`);
  authorizationScreen.find(`#password`).simulate(`change`);
  authorizationScreen.find(`#password`).simulate(`change`);
  authorizationScreen.find(`.login__form`).simulate(`submit`, {
    preventDefault
  });

  expect(onEmailChangeMock).toHaveBeenCalledTimes(1);
  expect(onPasswordChangeMock).toHaveBeenCalledTimes(2);
  expect(preventDefault).toHaveBeenCalledTimes(1);
  expect(loginMock).toHaveBeenCalledTimes(1);
});
