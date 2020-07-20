import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LosingScreen} from "./losing-screen";

configure({adapter: new Adapter()});

test(`LosingScreen renders correctly`, () => {
  const tree = shallow(<LosingScreen onReplayButtonClick={jest.fn()}/>);

  expect(tree).toMatchSnapshot();
});
