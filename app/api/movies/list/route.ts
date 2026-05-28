import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, formatPosterImage } from '@/lib/tmdbClient'
import { TmdbListResponse, TmdbMovie } from '@/types/tmdb-api'
import { MovieType } from '@/types/movie'

const ENDPOINTS: Record<string, string> = {
  trending_day: '/trending/movie/day',
  trending_week: '/trending/movie/week',
  now_playing: '/movie/now_playing',
  upcoming: '/movie/upcoming',
  top_rated: '/movie/top_rated',
}

function toMovieType(m: TmdbMovie): MovieType {
  return {
    id: m.id,
    title: m.title,
    overview: m.overview,
    poster_path: formatPosterImage(m.poster_path),
    release_date: m.release_date,
    vote_average: m.vote_average,
    backdrop_path: formatPosterImage(m.backdrop_path),
    original_title: m.original_title,
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const category = searchParams.get('category') ?? 'trending'
    const option = searchParams.get('option') ?? 'day'
    const page = searchParams.get('page') ?? '1'

    const key = category === 'trending' ? `trending_${option}` : category
    const endpoint = ENDPOINTS[key] ?? ENDPOINTS.trending_day

    const data = await tmdbFetch<TmdbListResponse<TmdbMovie>>(endpoint, {
      language: 'zh-TW',
      page,
    })

    return NextResponse.json(data.results.map(toMovieType))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch movie list' }, { status: 500 })
  }
}
