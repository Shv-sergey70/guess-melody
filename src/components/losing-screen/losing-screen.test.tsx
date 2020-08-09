import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {LosingScreen} from "./losing-screen";

configure({adapter: new Adapter()});

describe(`LosingScreen renders correctly`, () => {
  test(`Losing by time`, () => {
    const tree = shallow(
        <LosingScreen
          isNoMoreTime={true}
          isNoMoreAttempts={false} />
    );

    expect(tree).toMatchSnapshot();
  });

  test(`Losing by attempts`, () => {
    const tree = shallow(
        <LosingScreen
          isNoMoreTime={false}
          isNoMoreAttempts={true} />
    );

    expect(tree).toMatchSnapshot();
  });

  test(`No losing reasons - redirect to main page`, () => {
    const tree = shallow(
        <LosingScreen
          isNoMoreTime={false}
          isNoMoreAttempts={false} />
    );

    expect(tree).toMatchSnapshot();
  });
});
