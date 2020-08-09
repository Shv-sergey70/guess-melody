import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import TimerBlock from "./timer-block";

configure({adapter: new Adapter()});

test(`Timer-block renders correctly`, () => {
  const tree = shallow(<TimerBlock/>);

  expect(tree).toMatchSnapshot();
});
