const BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'

export function formatPosterImage(path: string | null): string {
  return path ? `${IMAGE_BASE}${path}` : '/image/movie_image.jpg'
}

export function formatActorImage(path: string | null): string {
  return path ? `${IMAGE_BASE}${path}` : '/image/nullActor.jpg'
}

export async function tmdbFetch<T>(
  path: string,
  params?: Record<string, string>
): Promise<T> {
  const url = new URL(`${BASE_URL}${path}`)
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))
  }

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${process.env.TMDB_READ_ACCESS_TOKEN}` },
  })

  if (!res.ok) {
    throw new Error(`TMDB API error ${res.status}: ${path}`)
  }

  return res.json()
}
