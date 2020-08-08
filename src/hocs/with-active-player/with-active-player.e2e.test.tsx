import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import withActivePlayer from "./with-active-player";

configure({adapter: new Adapter()});

type Props = {
  renderAudioPlayer: (src: string, index: number) => React.ReactNode
};

const Component: React.FunctionComponent<Props> = ({renderAudioPlayer}) => {
  return (
    <div>
      <div id="first">{renderAudioPlayer(`some/way1`, 5)}</div>
      <div id="second">{renderAudioPlayer(`some/way2`, 3)}</div>
    </div>
  );
};

const ComponentWrapped = withActivePlayer(Component);

describe(`WithActivePlayer correctly works`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  test(`WithActivePlayer has correct initial state`, () => {
    const componentWrapped = mount(<ComponentWrapped/>);

    expect(componentWrapped.state(`activePlayer`)).toEqual(0);
  });

  test(`WithActivePlayer changes state correctly`, () => {
    const componentWrapped = mount(<ComponentWrapped/>);
    const firstButton = componentWrapped.find(`#first .track__button`);
    const secondButton = componentWrapped.find(`#second .track__button`);

    expect(firstButton.prop(`disabled`)).toEqual(true);
    expect(secondButton.prop(`disabled`)).toEqual(true);

    // @todo fix it

    // firstButton.prop(`onClick`)();
    // expect(componentWrapped.state(`activePlayer`)).toEqual(5);

    // secondButton.prop(`onClick`)();
    // expect(componentWrapped.state(`activePlayer`)).toEqual(3);

    // secondButton.prop(`onClick`)();
    // expect(componentWrapped.state(`activePlayer`)).toEqual(-1);
  });
});
