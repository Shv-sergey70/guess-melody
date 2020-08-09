import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Timer from "./timer";

configure({adapter: new Adapter()});

describe(`Timer renders correctly`, () => {
  test(`Timer has a lot of time - usual behaviour`, () => {
    const tree = shallow(
        <Timer
          minutes={`02`}
          seconds={`52`}
          isFinishing={false}
        />
    );

    expect(tree).toMatchSnapshot();
  });

  test(`Timer has low time - should be added finishing class`, () => {
    const tree = shallow(
        <Timer
          minutes={`00`}
          seconds={`18`}
          isFinishing={true}
        />
    );

    expect(tree).toMatchSnapshot();
  });
});
