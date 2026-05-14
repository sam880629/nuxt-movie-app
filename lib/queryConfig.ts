const MINUTE = 1000 * 60

export const STALE_TIME = {
  trending: MINUTE * 10,
  search: MINUTE * 3,
  movieDetail: MINUTE * 60,
  static: Infinity,
} as const

export const GC_TIME = {
  default: MINUTE * 10,
  movieDetail: MINUTE * 60,
  static: MINUTE * 60 * 24,
} as const
