'use client'

import { useEffect, useState } from 'react'
import { useTvList } from '@/hooks/useTv'
import { useDiscoverTvShows } from '@/hooks/useProviders'
import TvShowList from '@/components/TvShowList'
import MovieCardSkeleton from '@/components/MovieStyle/MovieCardSkeleton'
import CategorySelector from '@/components/CategorySelector'
import ProviderFilter from '@/components/ProviderFilter'

const SKELETON_COUNT = 8

export default function TvPage() {
  const [category, setCategory] = useState('trending')
  const [option, setOption] = useState<'day' | 'week'>('day')
  const [selectedProvider, setSelectedProvider] = useState<number | null>(null)

  const list = useTvList(category, option)
  const discover = useDiscoverTvShows(selectedProvider ?? 0)

  const active = selectedProvider ? discover : list
  const { shows, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = active as typeof list

  useEffect(() => {
    fetchNextPage()

    const handleScroll = () => {
      if (
        hasNextPage &&
        !isFetchingNextPage &&
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const handleProviderSelect = (id: number | null) => {
    setSelectedProvider(id)
    setCategory('trending')
  }

  return (
    <>
      <ProviderFilter type="tv" selectedId={selectedProvider} onSelect={handleProviderSelect} />
      {!selectedProvider && (
        <CategorySelector
          type="tv"
          category={category}
          option={option}
          onCategoryChange={setCategory}
          onOptionChange={setOption}
        />
      )}
      {isLoading ? (
        <div className="bg-[#211c1e] p-5 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <MovieCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <TvShowList shows={shows} />
      )}
    </>
  )
}
