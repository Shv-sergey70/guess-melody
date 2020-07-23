import React, {PureComponent} from 'react';
import withAudio from "../with-audio/with-audio";
import AudioPlayer from "../../components/audio-player/audio-player";

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1
      };

      this._setActivePlayer = this._setActivePlayer.bind(this);
    }

    render() {
      const {activePlayer} = this.state;

      return (
        <Component
          {...this.props}
          renderAudioPlayer={(src, id) => {
            return (
              <AudioPlayerWrapped
                src={src}
                isPlaying={activePlayer === id}
                onPlayButtonClick={() => this._setActivePlayer(id)}/>
            );
          }}
        />
      );
    }

    _setActivePlayer(newActivePlayer) {
      this.setState(({activePlayer}) => ({
        activePlayer: newActivePlayer === activePlayer ? -1 : newActivePlayer
      }));
    }
  }

  return WithActivePlayer;
};


export default withActivePlayer;
