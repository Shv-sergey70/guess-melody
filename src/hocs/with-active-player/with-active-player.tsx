import * as React from 'react';
import withAudio from "../with-audio/with-audio";
import AudioPlayer from "../../components/audio-player/audio-player";

const AudioPlayerWrapped = withAudio(AudioPlayer);

type State = {
  activePlayer: number
};

const withActivePlayer = (Component) => {
  type Props = React.ComponentProps<typeof Component>; // Получаем пропсы переданного компонента

  class WithActivePlayer extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: 0
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
                changePlayingState={() => this._setActivePlayer(id)}/>
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
