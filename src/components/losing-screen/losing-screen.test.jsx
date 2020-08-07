import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LosingScreen} from "./losing-screen";

configure({adapter: new Adapter()});

describe(`LosingScreen renders correctly`, () => {
  test(`Losing by time`, () => {
    const tree = shallow(
        <LosingScreen
          onReplayButtonClick={jest.fn()}
          isNoMoreTime={true}
          isNoMoreAttempts={false} />
    );

    expect(tree).toMatchSnapshot();
  });

  test(`Losing by attempts`, () => {
    const tree = shallow(
        <LosingScreen
          onReplayButtonClick={jest.fn()}
          isNoMoreTime={false}
          isNoMoreAttempts={true} />
    );

    expect(tree).toMatchSnapshot();
  });

  test(`No losing reasons - redirect to main page`, () => {
    const tree = shallow(
        <LosingScreen
          onReplayButtonClick={jest.fn()}
          isNoMoreTime={false}
          isNoMoreAttempts={false} />
    );

    expect(tree).toMatchSnapshot();
  });
});
