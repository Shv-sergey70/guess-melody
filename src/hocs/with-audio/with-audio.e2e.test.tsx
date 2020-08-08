import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withAudio from "./with-audio";

configure({adapter: new Adapter()});

interface Props {
  children: React.ReactNode
}

const Component: React.FunctionComponent<Props> = ({children}) => <div>{children}</div>;

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
          changePlayingState={jest.fn()}
        />
    );

    expect(componentWrapped.state()).toEqual({
      isLoading: true
    });
  });
});
