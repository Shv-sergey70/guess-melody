import * as React from 'react';
import {Subtract} from "utility-types";

interface InjectedProps {
  src: string,
  isPlaying: boolean,
  changePlayingState: () => void
}

interface State {
  isLoading: boolean
};

const withAudio = (Component) => {
  type Props = React.ComponentPropsWithRef<typeof Component>;

  type ActualProps = Subtract<Props, InjectedProps>;

  class WithAudio extends React.PureComponent<ActualProps, State> {
    readonly _audioRef: React.RefObject<HTMLMediaElement>;

    constructor(props) {
      super(props);

      this.state = {
        isLoading: true
      };

      this._audioRef = React.createRef();
    }

    componentDidMount() {
      const {current: audio} = this._audioRef;
      const {changePlayingState} = this.props;

      audio.oncanplaythrough = () => {
        this.setState({
          isLoading: false
        });
      };

      audio.onerror = () => {
        changePlayingState();
        audio.load();
      };
    }

    componentDidUpdate() {
      const {current: audio} = this._audioRef;
      const {isPlaying} = this.props;

      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const {current: audio} = this._audioRef;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
    }

    render() {
      const {isLoading} = this.state;
      const {src} = this.props;

      return (
        <Component
          {...this.props}
          isLoading={isLoading} >
          <audio src={src} ref={this._audioRef} />
        </Component>
      );
    }
  }

  return WithAudio;
};

export default withAudio;
