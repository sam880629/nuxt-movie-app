import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, formatPosterImage } from '@/lib/tmdbClient'
import { TmdbListResponse, TmdbTvShow } from '@/types/tmdb-api'
import { TvShowType } from '@/types/tv'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const option = searchParams.get('option') ?? 'day'
    const page = searchParams.get('page') ?? '1'

    const data = await tmdbFetch<TmdbListResponse<TmdbTvShow>>(
      `/trending/tv/${option}`,
      { language: 'zh-TW', page }
    )

    const shows: TvShowType[] = data.results.map((s) => ({
      id: s.id,
      name: s.name,
      overview: s.overview,
      poster_path: formatPosterImage(s.poster_path),
      backdrop_path: formatPosterImage(s.backdrop_path),
      first_air_date: s.first_air_date,
      vote_average: s.vote_average,
      original_name: s.original_name,
    }))

    return NextResponse.json(shows)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch trending TV shows' }, { status: 500 })
  }
}
