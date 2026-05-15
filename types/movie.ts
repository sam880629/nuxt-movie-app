export interface MovieType {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
  backdrop_path: string
  original_title: string
}

export interface GenreType {
  id: number
  name: string
}

export interface MovieDetailsType {
  id: number
  title: string
  overview: string
  poster_path: string
  release_date: string
  vote_average: number
  backdrop_path: string
  original_title: string
  genres: GenreType[]
  runtime: number
}

export interface DirectorType {
  id: number
  name: string
  profile_path: string
  job: string
}

export interface ActorsType {
  id: number
  name: string
  profile_path: string
  character: string
}

export interface CreditsType {
  actors: ActorsType[]
  director: DirectorType | null
}
