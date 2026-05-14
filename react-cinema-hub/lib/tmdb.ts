const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'

const formatImage = (path: string | null, fallback: string) =>
  path ? IMAGE_BASE + path : fallback

export const getPopularMovies = async (option: string, page: number) => {
  const url = `https://api.themoviedb.org/3/trending/movie/${option}?api_key=${API_KEY}&language=zh-TW&page=${page}`
  try {
    const response = await fetch(url).then(res => res.json())
    return response.results.map((val: any) => ({
      ...val,
      poster_path: formatImage(val.poster_path, '/image/movie_image.jpg'),
      backdrop_path: formatImage(val.backdrop_path, '/image/movie_image.jpg'),
    }))
  } catch (error) {
    console.error('Error fetching popular movies:', error)
    return []
  }
}

export const getMovies = async (query: string) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=zh-TW&page=1&query=${query}`
  try {
    const response = await fetch(url).then(res => res.json())
    return response.results.map((val: any) => ({
      ...val,
      poster_path: formatImage(val.poster_path, '/image/movie_image.jpg'),
      backdrop_path: formatImage(val.backdrop_path, '/image/movie_image.jpg'),
    }))
  } catch (error) {
    console.error('Error fetching movies:', error)
    return []
  }
}

export const getMoviesDetails = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=zh-TW`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return {
      ...data,
      poster_path: formatImage(data.poster_path, '/image/movie_image.jpg'),
    }
  } catch (error) {
    console.error('Error fetching movie details:', error)
    return null
  }
}

export const getMovieTrailerKey = async (id: number): Promise<string | null> => {
  const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
  try {
    const res = await fetch(url)
    const videoData = await res.json()
    const trailer = videoData.results?.find((v: any) => v.type === 'Trailer')
    return trailer?.key ?? null
  } catch (error) {
    console.error('Error fetching trailer:', error)
    return null
  }
}

export const getCredits = async (id: number) => {
  const url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=zh-TW`
  try {
    const response = await fetch(url)
    const data = await response.json()
    const actors = data.cast.slice(0, 6).map((actor: any) => ({
      ...actor,
      profile_path: formatImage(actor.profile_path, '/image/nullActor.jpg'),
    }))
    const director = data.crew
      .filter((val: any) => val.job === 'Director')
      .map((val: any) => ({
        ...val,
        profile_path: formatImage(val.profile_path, '/image/nullActor.jpg'),
      }))[0]
    return { actors, director }
  } catch (error) {
    console.error('Error fetching credits:', error)
    return { actors: [], director: null }
  }
}
