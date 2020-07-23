import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import withUserAnswers from './with-user-answers';

configure({adapter: new Adapter()});

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [
    {
      src: `./tracks/Anivar_Summer.mp3`,
      genre: `pop`
    },
    {
      src: `./tracks/Billie_Eilish_ilomilo.mp3`,
      genre: `jazz`
    },
    {
      src: `./tracks/Cj_L_Black_Rain.mp3`,
      genre: `rock`
    },
    {
      src: `./tracks/Orquesta.mp3`,
      genre: `classic`
    }
  ]
};

const ComponentWrapped = withUserAnswers(() => <div/>);

describe(`withUserAnswer correctly works`, () => {
  test(`initial state is correct`, () => {
    const renderedComponent = shallow(
        <ComponentWrapped
          question={question}
          onAnswer={jest.fn()} />
    );

    expect(renderedComponent.state()).toEqual({
      answers: [false, false, false, false]
    });
  });

  test(`answers correctly change`, () => {
    const renderedComponent = shallow(
        <ComponentWrapped
          question={question}
          onAnswer={jest.fn()} />
    );

    expect(renderedComponent.state()).toEqual({
      answers: [false, false, false, false]
    });

    renderedComponent.prop(`changeAnswer`)(2);
    renderedComponent.prop(`changeAnswer`)(1);
    renderedComponent.prop(`changeAnswer`)(1);

    expect(renderedComponent.state()).toEqual({
      answers: [false, false, true, false]
    });
  });

  test(`answers correctly submit`, () => {
    const onAnswerMock = jest.fn();

    const renderedComponent = shallow(
        <ComponentWrapped
          question={question}
          onAnswer={onAnswerMock} />
    );

    renderedComponent.prop(`changeAnswer`)(2);
    renderedComponent.prop(`changeAnswer`)(1);

    renderedComponent.prop(`submitAnswers`)();

    expect(onAnswerMock).toHaveBeenCalledTimes(1);
    expect(onAnswerMock).toHaveBeenCalledWith([false, true, true, false], question);
  });
});
