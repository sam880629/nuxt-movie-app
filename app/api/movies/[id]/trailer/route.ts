import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch } from '@/lib/tmdbClient'
import { TmdbVideosResponse } from '@/types/tmdb-api'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await tmdbFetch<TmdbVideosResponse>(`/movie/${id}/videos`, { language: 'en-US' })

    const trailer = data.results.find((v) => v.type === 'Trailer' && v.site === 'YouTube')
    return NextResponse.json({ key: trailer?.key ?? null })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch trailer' }, { status: 500 })
  }
}
