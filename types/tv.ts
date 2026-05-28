import { GenreType, ActorsType, DirectorType } from './movie'

export interface TvShowType {
  id: number
  name: string
  overview: string
  poster_path: string
  backdrop_path: string
  first_air_date: string
  vote_average: number
  original_name: string
}

export interface TvShowDetailsType {
  id: number
  name: string
  overview: string
  poster_path: string
  backdrop_path: string
  first_air_date: string
  vote_average: number
  original_name: string
  genres: GenreType[]
  episode_run_time: number[]
  number_of_seasons: number
  number_of_episodes: number
  status: string
}

export interface TvCreditsType {
  actors: ActorsType[]
  director: DirectorType | null
}
