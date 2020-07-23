import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withActivePlayer from "./with-active-player";

configure({adapter: new Adapter()});

const Component = ({renderAudioPlayer}) => {
  return (
    <div>
      <div id="first">{renderAudioPlayer(`some/way1`, 5)}</div>
      <div id="second">{renderAudioPlayer(`some/way2`, 3)}</div>
    </div>
  );
};

Component.propTypes = {
  renderAudioPlayer: PropTypes.func.isRequired
};

const ComponentWrapped = withActivePlayer(Component);

describe(`WithActivePlayer correctly works`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  test(`WithActivePlayer has correct initial state`, () => {
    const componentWrapped = mount(<ComponentWrapped/>);

    expect(componentWrapped.state(`activePlayer`)).toEqual(-1);
  });

  test(`WithActivePlayer changes state correctly`, () => {
    const componentWrapped = mount(<ComponentWrapped/>);
    const firstButton = componentWrapped.find(`#first .track__button`);
    const secondButton = componentWrapped.find(`#second .track__button`);

    expect(firstButton.prop(`disabled`)).toEqual(true);
    expect(secondButton.prop(`disabled`)).toEqual(true);

    firstButton.prop(`onClick`)();
    expect(componentWrapped.state(`activePlayer`)).toEqual(5);

    secondButton.prop(`onClick`)();
    expect(componentWrapped.state(`activePlayer`)).toEqual(3);

    secondButton.prop(`onClick`)();
    expect(componentWrapped.state(`activePlayer`)).toEqual(-1);
  });
});
