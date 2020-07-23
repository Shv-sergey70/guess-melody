import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from "./app";

configure({adapter: new Adapter()});

const questions = [
  {
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
        src: `./tracks/Orquesta_L_rica_de_Barcelona_Las_Cuatro_Estaciones,_Invierno_Allegro_Non_Molto.mp3`,
        genre: `classic`
      }
    ]
  },
  {
    type: `artist`,
    song: {
      artist: `Artur Latte`,
      src: `./tracks/Raim_Artur_Latte.mp3`,
    },
    answers: [
      {
        picture: `/img/default-artist.png`,
        artist: `Billie Eilish`
      },
      {
        picture: `/img/default-artist.png`,
        artist: `Imagine Dragons`
      },
      {
        picture: `/img/default-artist.png`,
        artist: `Artur Latte`
      }
    ]
  }
];

describe(`App correctly renders`, () => {
  test(`Welcome screen`, () => {
    const tree = shallow(
        <App
          time={300}
          attempts={3}
          questions={questions}
          currentStep={-1}
          onAnswer={jest.fn()} />
    );

    expect(tree).toMatchSnapshot();
  });

  test(`Genre-question screen`, () => {
    const tree = shallow(
        <App
          time={300}
          attempts={3}
          questions={questions}
          currentStep={0}
          onAnswer={jest.fn()} />
    );

    expect(tree).toMatchSnapshot();
  });

  test(`Artist-question screen`, () => {
    const tree = shallow(
        <App
          time={300}
          attempts={3}
          questions={questions}
          currentStep={1}
          onAnswer={jest.fn()} />
    );

    expect(tree).toMatchSnapshot();
  });

  test(`Losing screen`, () => {
    const tree = shallow(
        <App
          time={0}
          attempts={3}
          questions={questions}
          currentStep={1}
          onAnswer={jest.fn()} />
    );

    expect(tree).toMatchSnapshot();
  });
});
