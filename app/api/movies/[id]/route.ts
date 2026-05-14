import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, formatPosterImage } from '@/lib/tmdbClient'
import { TmdbMovieDetails } from '@/types/tmdb-api'
import { MovieDetailsType } from '@/types/movie'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const raw = await tmdbFetch<TmdbMovieDetails>(`/movie/${id}`, { language: 'zh-TW' })

    const details: MovieDetailsType = {
      id: raw.id,
      title: raw.title,
      overview: raw.overview,
      poster_path: formatPosterImage(raw.poster_path),
      release_date: raw.release_date,
      vote_average: raw.vote_average,
      backdrop_path: formatPosterImage(raw.backdrop_path),
      original_title: raw.original_title,
      genres: raw.genres,
      runtime: raw.runtime,
    }

    return NextResponse.json(details)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch movie details' }, { status: 500 })
  }
}
