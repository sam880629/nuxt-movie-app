import { MovieType, MovieDetailsType, CreditsType } from '@/types/movie'

async function apiFetch<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`)
  return res.json()
}

// 抓取熱門電影
export const fetchTrendingMovies = (option: string, page: number): Promise<MovieType[]> =>
  apiFetch(`/api/movies/trending?option=${option}&page=${page}`)

// 依分類抓取電影清單
export const fetchMovieList = (category: string, option: string, page: number): Promise<MovieType[]> =>
  apiFetch(`/api/movies/list?category=${category}&option=${option}&page=${page}`)

// 搜尋電影
export const fetchSearchMovies = (query: string): Promise<MovieType[]> =>
  apiFetch(`/api/movies/search?q=${encodeURIComponent(query)}`)

// 抓取電影詳情
export const fetchMovieDetails = (id: number): Promise<MovieDetailsType> =>
  apiFetch(`/api/movies/${id}`)

// 抓取電影預告片的 key
export const fetchMovieTrailerKey = async (id: number): Promise<string | null> => {
  const data = await apiFetch<{ key: string | null }>(`/api/movies/${id}/trailer`)
  return data.key
}

// 抓取電影演員和導演資訊
export const fetchMovieCredits = (id: number): Promise<CreditsType> =>
  apiFetch(`/api/movies/${id}/credits`)
