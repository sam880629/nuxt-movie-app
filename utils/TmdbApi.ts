const getConfig = () => useRuntimeConfig().public

// 共用：處理圖片路徑
const formatImage = (path: string | null, fallback: string) => {
  const { tmdbImageBaseUrl } = getConfig()
  return path ? tmdbImageBaseUrl + path : fallback
}

// 獲取熱門電影資料
export const getPopularMovies = async (option: string, page: number) => {
  const { tmdbApiKey, tmdbApiBaseUrl } = getConfig()
  const url = `${tmdbApiBaseUrl}/trending/movie/${option}?api_key=${tmdbApiKey}&language=zh-TW&page=${page}`
  try {
    const response = await fetch(url).then(res => res.json())
    return response.results.map((val: any) => ({
      ...val,
      poster_path: formatImage(val.poster_path, '/image/movie_image.jpg'),
      backdrop_path: formatImage(val.backdrop_path, '/image/movie_image.jpg'),
    }))
  } catch (error) {
    console.log('Error fetching popular movies:', error)
    return []
  }
}

// 搜尋電影資料
export const getMovies = async (query: string) => {
  const { tmdbApiKey, tmdbApiBaseUrl } = getConfig()
  const url = `${tmdbApiBaseUrl}/search/movie?api_key=${tmdbApiKey}&language=zh-TW&page=1&query=${query}`
  try {
    const response = await fetch(url).then(res => res.json())
    return response.results.map((val: any) => ({
      ...val,
      poster_path: formatImage(val.poster_path, '/image/movie_image.jpg'),
      backdrop_path: formatImage(val.backdrop_path, '/image/movie_image.jpg'),
    }))
  } catch (error) {
    console.log('err:', error)
    return []
  }
}

// 獲取電影詳細資料
export const getMoviesDetails = async (id: number) => {
  const { tmdbApiKey, tmdbApiBaseUrl } = getConfig()
  const url = `${tmdbApiBaseUrl}/movie/${id}?api_key=${tmdbApiKey}&language=zh-TW&page=1`
  try {
    const response = await fetch(url)
    const data = await response.json()
    return {
      ...data,
      poster_path: formatImage(data.poster_path, '/image/movie_image.jpg'),
    }
  } catch (error) {
    console.log('err:', error)
    return []
  }
}

// 取得預告片
export const getMovieVideos = async (id: number) => {
  const { tmdbApiKey, tmdbApiBaseUrl } = getConfig()
  const url = `${tmdbApiBaseUrl}/movie/${id}/videos?api_key=${tmdbApiKey}&language=en-US`
  try {
    const res = await fetch(url)
    const videoData = await res.json()
    if (videoData.results.length > 0) {
      const target = videoData.results.find((val: any) => val.type === 'Trailer')
      return target ? target.key : null
    }
   
    return null
  } catch (e) {
    console.log('error:', e)
    return null
  }
}

// 工作人員資料
export const getCredits = async (id: number) => {
  const { tmdbApiKey, tmdbApiBaseUrl } = getConfig()
  const url = `${tmdbApiBaseUrl}/movie/${id}/credits?api_key=${tmdbApiKey}&language=zh-TW`
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
  } catch (err) {
    console.log('error:', err)
    return []
  }
}