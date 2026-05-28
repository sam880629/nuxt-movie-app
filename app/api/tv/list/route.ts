import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, formatPosterImage } from '@/lib/tmdbClient'
import { TmdbListResponse, TmdbTvShow } from '@/types/tmdb-api'
import { TvShowType } from '@/types/tv'

const ENDPOINTS: Record<string, string> = {
  trending_day: '/trending/tv/day',
  trending_week: '/trending/tv/week',
  on_the_air: '/tv/on_the_air',
  airing_today: '/tv/airing_today',
  top_rated: '/tv/top_rated',
}

function toTvShowType(s: TmdbTvShow): TvShowType {
  return {
    id: s.id,
    name: s.name,
    overview: s.overview,
    poster_path: formatPosterImage(s.poster_path),
    backdrop_path: formatPosterImage(s.backdrop_path),
    first_air_date: s.first_air_date,
    vote_average: s.vote_average,
    original_name: s.original_name,
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

    const data = await tmdbFetch<TmdbListResponse<TmdbTvShow>>(endpoint, {
      language: 'zh-TW',
      page,
    })

    return NextResponse.json(data.results.map(toTvShowType))
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch TV list' }, { status: 500 })
  }
}
