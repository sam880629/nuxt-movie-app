import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, formatPosterImage } from '@/lib/tmdbClient'
import { TmdbTvShowDetails } from '@/types/tmdb-api'
import { TvShowDetailsType } from '@/types/tv'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const raw = await tmdbFetch<TmdbTvShowDetails>(`/tv/${id}`, { language: 'zh-TW' })

    const details: TvShowDetailsType = {
      id: raw.id,
      name: raw.name,
      overview: raw.overview,
      poster_path: formatPosterImage(raw.poster_path),
      backdrop_path: formatPosterImage(raw.backdrop_path),
      first_air_date: raw.first_air_date,
      vote_average: raw.vote_average,
      original_name: raw.original_name,
      genres: raw.genres,
      episode_run_time: raw.episode_run_time,
      number_of_seasons: raw.number_of_seasons,
      number_of_episodes: raw.number_of_episodes,
      status: raw.status,
    }

    return NextResponse.json(details)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch TV show details' }, { status: 500 })
  }
}
