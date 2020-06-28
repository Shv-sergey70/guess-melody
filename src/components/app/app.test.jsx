import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from "./app";

configure({adapter: new Adapter()});

test(`App correctly renders`, () => {
  const tree = shallow(
      <App
        time={5}
        attempts={3}
        onWelcomeButtonClick={jest.fn()}
      />);

  expect(tree).toMatchSnapshot();
});
