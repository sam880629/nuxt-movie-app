import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, formatPosterImage } from '@/lib/tmdbClient'
import { TmdbListResponse, TmdbMovie } from '@/types/tmdb-api'
import { MovieType } from '@/types/movie'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const providerId = searchParams.get('provider') ?? ''
    const page = searchParams.get('page') ?? '1'

    const data = await tmdbFetch<TmdbListResponse<TmdbMovie>>('/discover/movie', {
      language: 'zh-TW',
      page,
      sort_by: 'popularity.desc',
      with_watch_providers: providerId,
      watch_region: 'TW',
    })

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
    return NextResponse.json({ error: 'Failed to discover movies' }, { status: 500 })
  }
}
