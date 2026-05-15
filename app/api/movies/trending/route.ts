import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, formatPosterImage } from '@/lib/tmdbClient'
import { TmdbListResponse, TmdbMovie } from '@/types/tmdb-api'
import { MovieType } from '@/types/movie'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const option = searchParams.get('option') ?? 'day'
    const page = searchParams.get('page') ?? '1'

    const data = await tmdbFetch<TmdbListResponse<TmdbMovie>>(
      `/trending/movie/${option}`,
      { language: 'zh-TW', page }
    )

    const movies: MovieType[] = data.results.map((m) => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      poster_path: formatPosterImage(m.poster_path),
      release_date: m.release_date,
      vote_average: m.vote_average,
      backdrop_path: formatPosterImage(m.backdrop_path),
      original_title: m.original_title,
    }))

    return NextResponse.json(movies)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch trending movies' }, { status: 500 })
  }
}
