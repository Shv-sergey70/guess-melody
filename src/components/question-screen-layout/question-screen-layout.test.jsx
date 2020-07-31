import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import QuestionScreenLayout from "./question-screen-layout";

configure({adapter: new Adapter()});

describe(`Game screen correctly works`, () => {
  const genreQuestion = {
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
  };

  const artistQuestion = {
    type: `artist`,
    song: {},
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
  };

  test(`Genre screen renders`, () => {
    const tree = shallow(
        <QuestionScreenLayout
          question={genreQuestion}
          onAnswer={jest.fn()}
        />
    );

    expect(tree).toMatchSnapshot();
  });

  test(`Artist screen renders`, () => {
    const tree = shallow(
        <QuestionScreenLayout
          question={artistQuestion}
          onAnswer={jest.fn()}
        />
    );

    expect(tree).toMatchSnapshot();
  });
});
