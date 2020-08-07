import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {WelcomeScreen} from "./welcome-screen";

configure({adapter: new Adapter()});

test(`WelcomeScreen welcome button success click`, () => {
  const onWelcomeButtonClick = jest.fn();

  const welcomeScreen = shallow(
      <WelcomeScreen
        time={300}
        attempts={3}
        onWelcomeButtonClick={onWelcomeButtonClick}
        isButtonDisabled={false} />
  );

  welcomeScreen.find(`.welcome__button`).simulate(`click`);

  expect(onWelcomeButtonClick).toHaveBeenCalledTimes(1);
});
