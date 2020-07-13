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
  },
  {
    type: `artist`,
    song: {
      artist: `Tech Thieves`,
      src: `./tracks/The_Tech_Thieves_Fake.mp3`,
    },
    answers: [
      {
        picture: `/img/default-artist.png`,
        artist: `Tech Thieves`
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

export default questions;
