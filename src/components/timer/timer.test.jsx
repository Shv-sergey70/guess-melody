import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Timer} from "./timer";

configure({adapter: new Adapter()});

test(`Timer renders correctly`, () => {
  const tickMock = jest.fn();

  const tree = shallow(
      <Timer
        time={119}
        tick={tickMock} />
  );

  expect(tree).toMatchSnapshot();
});
