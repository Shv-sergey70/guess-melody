import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from "./welcome-screen";

configure({adapter: new Adapter()});

test(`WelcomeScreen correctly renders`, () => {
  const tree = shallow(
      <WelcomeScreen
        time={5}
        attempts={3}
        onWelcomeButtonClick={jest.fn()}
      />);

  expect(tree).toMatchSnapshot();
});
