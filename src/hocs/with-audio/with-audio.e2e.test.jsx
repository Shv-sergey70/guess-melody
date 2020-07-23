import React from 'react';
import PropTypes from 'prop-types';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withAudio from "./with-audio";

configure({adapter: new Adapter()});

const Component = ({children}) => <div>{children}</div>;

Component.propTypes = {
  children: PropTypes.node.isRequired
};

describe(`WithAudio correctly works`, () => {
  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
  });

  test(`Has correct initial state`, () => {
    const ComponentWrapped = withAudio(Component);

    const componentWrapped = mount(
        <ComponentWrapped
          src="/src/to/music.mp3"
          isPlaying={false}
        />
    );

    expect(componentWrapped.state()).toEqual({
      progress: 0,
      isLoading: true
    });
  });
});
