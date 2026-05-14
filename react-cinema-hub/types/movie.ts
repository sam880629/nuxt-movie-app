export interface MovieType {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  backdrop_path: string;
  original_title: string;
}

interface GenreType {
  id: number;
  name: string;
}

export interface MovieDetailsType {
  genres: GenreType[];
  runtime: number;
  video: string;
  [key: string]: any;
}

interface DirectorType {
  job: string;
  name: string;
  profile_path: string | null;
  [key: string]: any;
}

export interface CreditsType {
  actors: ActorsType[];
  director: DirectorType;
}

export interface ActorsType {
  name: string;
  profile_path: string;
  character: string;
  [key: string]: any;
}
