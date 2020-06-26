import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app';

const init = () => {
  ReactDom.render(
      <App
        time={5}
        attempts={3}
      />,
      document.querySelector(`#root`)
  );
};

init();
