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
