import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LosingScreenTime} from "./losing-screen-time";

configure({adapter: new Adapter()});

test(`LosingScreenTime renders correctly`, () => {
  const tree = shallow(<LosingScreenTime onReplayButtonClick={jest.fn()}/>);

  expect(tree).toMatchSnapshot();
});
