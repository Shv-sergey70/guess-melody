import React, {createRef, PureComponent} from 'react';
import PropTypes from 'prop-types';

const withAudio = (Component) => {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        progress: 0,
        isLoading: true
      };

      this._audioRef = createRef();
    }

    componentDidMount() {
      const {current: audio} = this._audioRef;

      audio.oncanplaythrough = () => {
        this.setState({
          isLoading: false
        });
      };

      audio.onplay = () => {
        this.setState({
          isPlaying: true
        });
      };

      audio.onpause = () => {
        this.setState({
          isPlaying: false
        });
      };

      audio.ontimeupdate = () => {
        this.setState({
          progress: audio.currentTime
        });
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

  WithAudio.propTypes = {
    src: PropTypes.string.isRequired,
    isPlaying: PropTypes.bool.isRequired
  };

  return WithAudio;
};

export default withAudio;
