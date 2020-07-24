import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {AuthorizationScreen} from "./authorization-screen";

configure({adapter: new Adapter()});

test(`Authorization screen correctly renders`, () => {
  const tree = shallow(
      <AuthorizationScreen
        email="myEmail@email.com"
        password="myPassword"
        onEmailChange={jest.fn()}
        onPasswordChange={jest.fn()}
        login={jest.fn()}
        isDisabled={true} />
  );

  expect(tree).toMatchSnapshot();
});
