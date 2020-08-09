import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import {WelcomeScreen} from "./welcome-screen";

configure({adapter: new Adapter()});

describe(`WelcomeScreen correctly works`, () => {
  test(`Start button enabled`, () => {
    const tree = shallow(
        <WelcomeScreen
          time={300}
          attempts={3}
          onWelcomeButtonClick={jest.fn()}
          isButtonDisabled={false}/>
    );

    expect(tree).toMatchSnapshot();
  });

  test(`Start button disabled`, () => {
    const tree = shallow(
        <WelcomeScreen
          time={300}
          attempts={3}
          onWelcomeButtonClick={jest.fn()}
          isButtonDisabled={true}/>
    );

    expect(tree).toMatchSnapshot();
  });
});
