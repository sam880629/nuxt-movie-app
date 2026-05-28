'use client'

interface Category {
  key: string
  label: string
  showTimePicker?: boolean
}

const MOVIE_CATEGORIES: Category[] = [
  { key: 'trending', label: '熱門', showTimePicker: true },
  { key: 'now_playing', label: '院線中' },
  { key: 'upcoming', label: '即將上映' },
  { key: 'top_rated', label: '最高評分' },
]

const TV_CATEGORIES: Category[] = [
  { key: 'trending', label: '熱門', showTimePicker: true },
  { key: 'on_the_air', label: '播出中' },
  { key: 'airing_today', label: '今日播出' },
  { key: 'top_rated', label: '最高評分' },
]

interface Props {
  type: 'movie' | 'tv'
  category: string
  option: 'day' | 'week'
  onCategoryChange: (category: string) => void
  onOptionChange: (option: 'day' | 'week') => void
}

export default function CategorySelector({ type, category, option, onCategoryChange, onOptionChange }: Props) {
  const categories = type === 'movie' ? MOVIE_CATEGORIES : TV_CATEGORIES
  const activeCategory = categories.find((c) => c.key === category)

  return (
    <div className="w-full bg-[#211c1e] px-5 pt-5 pb-3 flex flex-wrap items-center gap-3">
      {/* 分類 tabs */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onCategoryChange(cat.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              category === cat.key
                ? 'bg-white text-[#211c1e]'
                : 'bg-[#353132] text-[#efefef] hover:bg-[#4a4346]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 熱門的 day/week 子選擇器 */}
      {activeCategory?.showTimePicker && (
        <div className="flex flex-row items-center border border-[#4e484a] rounded-3xl w-fit relative">
          <div
            className={`rounded-3xl border-2 border-transparent absolute bg-cyan-950 w-18 h-7 m-0.75 ${
              option === 'day' ? 'select_day' : 'select_week'
            }`}
          />
          <div className="select_btn" onClick={() => onOptionChange('day')}>Day</div>
          <div className="select_btn" onClick={() => onOptionChange('week')}>Week</div>
        </div>
      )}
    </div>
  )
}
