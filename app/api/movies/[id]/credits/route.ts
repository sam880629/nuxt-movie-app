import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch, formatActorImage } from '@/lib/tmdbClient'
import { TmdbCreditsResponse } from '@/types/tmdb-api'
import { CreditsType } from '@/types/movie'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const data = await tmdbFetch<TmdbCreditsResponse>(`/movie/${id}/credits`, { language: 'zh-TW' })

    const directorRaw = data.crew.find((c) => c.job === 'Director') ?? null

    const credits: CreditsType = {
      actors: data.cast.slice(0, 6).map((c) => ({
        id: c.id,
        name: c.name,
        profile_path: formatActorImage(c.profile_path),
        character: c.character,
      })),
      director: directorRaw
        ? {
            id: directorRaw.id,
            name: directorRaw.name,
            profile_path: formatActorImage(directorRaw.profile_path),
            job: 'Director',
          }
        : null,
    }

    return NextResponse.json(credits)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch credits' }, { status: 500 })
  }
}
