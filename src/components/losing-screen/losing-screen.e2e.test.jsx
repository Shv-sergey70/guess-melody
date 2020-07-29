import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {LosingScreen} from "./losing-screen";

configure({adapter: new Adapter()});

test(`LosingScreen replay button success click`, () => {
  const onReplayButtonClick = jest.fn();

  const losingScreen = shallow(
      <LosingScreen
        onReplayButtonClick={onReplayButtonClick}
        isNoMoreTime={true}
        isNoMoreAttempts={false}
      />
  );

  losingScreen.find(`.replay`).simulate(`click`);

  expect(onReplayButtonClick).toHaveBeenCalledTimes(1);
});
