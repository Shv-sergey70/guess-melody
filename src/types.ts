interface GenreAnswer {
  src: string,
  genre: string
}

interface GenreQuestion {
  type: string,
  genre: string,
  answers: GenreAnswer[]
}

interface ArtistAnswer {
  picture: string,
  artist: string
}

interface ArtistQuestion {
  type: string,
  song: {
    artist: string,
    src: string
  },
  answers: ArtistAnswer[]
}

interface User {
  id: number,
  email: string
}

export {
  GenreQuestion,
  GenreAnswer,
  ArtistQuestion,
  ArtistAnswer,
  User
};
