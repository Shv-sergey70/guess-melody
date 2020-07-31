import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {WelcomeScreen} from "./welcome-screen";

configure({adapter: new Adapter()});

test(`WelcomeScreenLink correctly renders`, () => {
  const welcomeScreenLink = shallow(<WelcomeScreen onClick={jest.fn()} />);

  expect(welcomeScreenLink).toMatchSnapshot();
});
