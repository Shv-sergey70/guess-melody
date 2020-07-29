import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {VictoryScreen} from "./victory-screen";

configure({adapter: new Adapter()});

test(`Replay button correctly works`, () => {
  const onReplayButtonClickMock = jest.fn();

  const victoryScreen = shallow(
      <VictoryScreen
        mistakesCount={1}
        wastedTime={75}
        onReplayButtonClick={onReplayButtonClickMock} />
  );

  victoryScreen.find(`.replay`).simulate(`click`);

  expect(onReplayButtonClickMock).toHaveBeenCalledTimes(1);
});
