import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app/app';

import questions from './mocks/questions';

const init = (gameQuestions) => {
  ReactDom.render(
      <App
        time={5}
        attempts={3}
        questions={gameQuestions}
      />,
      document.querySelector(`#root`)
  );
};

init(questions);
