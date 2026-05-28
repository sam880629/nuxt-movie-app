import { NextRequest, NextResponse } from 'next/server'
import { tmdbFetch } from '@/lib/tmdbClient'
import { TmdbProvidersListResponse } from '@/types/tmdb-api'
import { ProviderType } from '@/types/provider'

const IMAGE_BASE = 'https://image.tmdb.org/t/p/original'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const type = searchParams.get('type') === 'tv' ? 'tv' : 'movie'

    const data = await tmdbFetch<TmdbProvidersListResponse>(
      `/watch/providers/${type}`,
      { watch_region: 'TW' }
    )

    const providers: ProviderType[] = data.results
      .sort((a, b) => a.display_priority - b.display_priority)
      .slice(0, 15)
      .map((p) => ({
        id: p.provider_id,
        name: p.provider_name,
        logo_path: `${IMAGE_BASE}${p.logo_path}`,
      }))

    return NextResponse.json(providers)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch providers' }, { status: 500 })
  }
}
