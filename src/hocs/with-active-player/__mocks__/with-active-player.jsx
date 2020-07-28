import React from 'react';

const withActivePlayer = (Component) => {
  const WithActivePlayer = (props) => {
    return (
      <Component
        {...props}
        renderAudioPlayer={jest.fn()} />
    );
  };

  return WithActivePlayer;
};


export default withActivePlayer;
