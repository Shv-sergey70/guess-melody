import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from "./app";
import {MemoryRouter} from 'react-router-dom';

configure({adapter: new Adapter()});

jest.mock(`../../hocs/with-active-player/with-active-player.jsx`);
jest.mock(`../artist-question-screen/artist-question-screen.jsx`, () => `artist-question-screen`);
jest.mock(`../genre-question-screen/genre-question-screen.jsx`, () => `genre-question-screen`);
jest.mock(`../welcome-screen/welcome-screen.jsx`, () => `welcome-screen`);
jest.mock(`../authorization-screen/authorization-screen.jsx`, () => `authorization-screen`);
jest.mock(`../losing-screen/losing-screen.jsx`, () => `losing-screen`);

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
    const tree = mount(
        <MemoryRouter initialEntries={[`/`]} keyLength={0} >
          <App
            time={300}
            attempts={3}
            questions={questions}
            currentStep={-1}
            onAnswer={jest.fn()}
            mistakesCount={1} />
        </MemoryRouter>
    );

    expect(tree.find(`App`)).toMatchSnapshot();
  });

  test(`Genre-question screen`, () => {
    const tree = mount(
        <MemoryRouter initialEntries={[`/`]} keyLength={0} >
          <App
            time={300}
            attempts={3}
            questions={questions}
            currentStep={0}
            onAnswer={jest.fn()}
            mistakesCount={1} />
        </MemoryRouter>
    );

    expect(tree.find(`App`)).toMatchSnapshot();
  });

  test(`Artist-question screen`, () => {
    const tree = mount(
        <MemoryRouter initialEntries={[`/`]} keyLength={0} >
          <App
            time={300}
            attempts={3}
            questions={questions}
            currentStep={1}
            onAnswer={jest.fn()}
            mistakesCount={1} />
        </MemoryRouter>
    );

    expect(tree.find(`App`)).toMatchSnapshot();
  });

  test(`Time losing screen`, () => {
    const tree = mount(
        <MemoryRouter initialEntries={[`/lose`]} keyLength={0} >
          <App
            time={0}
            attempts={3}
            questions={questions}
            currentStep={1}
            onAnswer={jest.fn()}
            mistakesCount={1}
            isAuthorizationRequired={false} />
        </MemoryRouter>
    );

    expect(tree.find(`App`)).toMatchSnapshot();
  });

  test(`Attempts losing screen`, () => {
    const tree = mount(
        <MemoryRouter initialEntries={[`/lose`]} keyLength={0} >
          <App
            time={300}
            attempts={3}
            questions={questions}
            currentStep={1}
            onAnswer={jest.fn()}
            mistakesCount={3} />
        </MemoryRouter>
    );

    expect(tree.find(`App`)).toMatchSnapshot();
  });

  test(`Authorization is required`, () => {
    const tree = mount(
        <MemoryRouter initialEntries={[`/auth`]} keyLength={0} >
          <App
            time={300}
            attempts={3}
            questions={questions}
            currentStep={0}
            onAnswer={jest.fn()}
            mistakesCount={1} />
        </MemoryRouter>
    );

    expect(tree.find(`App`)).toMatchSnapshot();
  });
});
