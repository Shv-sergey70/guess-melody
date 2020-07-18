import React, {PureComponent, Fragment, createRef} from "react";
import PropTypes from 'prop-types';

export default class AudioPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._audioRef = createRef();

    const {isPlaying} = props;

    this.state = {
      progress: 0,
      isLoading: true,
      isPlaying
    };

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
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
    const {isPlaying} = this.props;

    if (isPlaying) {
      this._audioRef.current.play();
    } else {
      this._audioRef.current.pause();
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
    const {src} = this.props;
    const {isPlaying, isLoading} = this.state;

    return (
      <Fragment>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={this._handlePlayButtonClick}/>
        <div className="track__status">
          <audio
            src={src}
            ref={this._audioRef} />
        </div>
      </Fragment>
    );
  }

  _handlePlayButtonClick() {
    this.setState(({isPlaying}) => ({
      isPlaying: !isPlaying
    }));

    const {onPlayButtonClick} = this.props;

    onPlayButtonClick();
  }
}

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlayButtonClick: PropTypes.func.isRequired
};
