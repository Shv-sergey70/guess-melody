import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LosingScreenAttempt} from "./losing-screen-attempts";

configure({adapter: new Adapter()});

test(`LosingScreenAttempt renders correctly`, () => {
  const tree = shallow(<LosingScreenAttempt onReplayButtonClick={jest.fn()}/>);

  expect(tree).toMatchSnapshot();
});
