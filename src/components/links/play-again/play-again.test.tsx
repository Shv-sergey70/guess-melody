import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {PlayAgain} from "./play-again";

configure({adapter: new Adapter()});

test(`PlayAgainLink correctly renders`, () => {
  const welcomeScreenLink = shallow(<PlayAgain onClick={jest.fn()} />);

  expect(welcomeScreenLink).toMatchSnapshot();
});
