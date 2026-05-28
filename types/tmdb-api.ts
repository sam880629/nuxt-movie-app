export interface TmdbMovie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  release_date: string
  vote_average: number
  backdrop_path: string | null
  original_title: string
}

export interface TmdbGenre {
  id: number
  name: string
}

export interface TmdbMovieDetails extends TmdbMovie {
  genres: TmdbGenre[]
  runtime: number
}

export interface TmdbVideo {
  key: string
  type: string
  site: string
}

export interface TmdbCastMember {
  id: number
  name: string
  profile_path: string | null
  character: string
}

export interface TmdbCrewMember {
  id: number
  name: string
  profile_path: string | null
  job: string
}

export interface TmdbListResponse<T> {
  results: T[]
  page: number
  total_pages: number
}

export interface TmdbVideosResponse {
  results: TmdbVideo[]
}

export interface TmdbCreditsResponse {
  cast: TmdbCastMember[]
  crew: TmdbCrewMember[]
}

export interface TmdbTvShow {
  id: number
  name: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  first_air_date: string
  vote_average: number
  original_name: string
}

export interface TmdbTvShowDetails extends TmdbTvShow {
  genres: TmdbGenre[]
  episode_run_time: number[]
  number_of_seasons: number
  number_of_episodes: number
  status: string
}

export interface TmdbTvCreditsResponse {
  cast: TmdbCastMember[]
  crew: TmdbCrewMember[]
}

export interface TmdbProvider {
  provider_id: number
  provider_name: string
  logo_path: string
  display_priority: number
}

export interface TmdbProvidersListResponse {
  results: TmdbProvider[]
}
