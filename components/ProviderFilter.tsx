'use client'

import Image from 'next/image'
import { useProviders } from '@/hooks/useProviders'
import { Skeleton } from '@heroui/react'

interface Props {
  type: 'movie' | 'tv'
  selectedId: number | null
  onSelect: (id: number | null) => void
}

export default function ProviderFilter({ type, selectedId, onSelect }: Props) {
  const { data: providers, isLoading } = useProviders(type)

  if (isLoading) {
    return (
      <div className="flex gap-2 px-5 py-3 overflow-x-auto">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="shrink-0 w-10 h-10 rounded-xl" />
        ))}
      </div>
    )
  }

  if (!providers?.length) return null

  return (
    <div className="flex items-center gap-2 px-5 py-3 overflow-x-auto scrollbar-thin">
      <button
        onClick={() => onSelect(null)}
        className={`shrink-0 px-3 h-10 rounded-xl text-xs font-semibold transition-all ${
          selectedId === null
            ? 'bg-white text-[#211c1e]'
            : 'bg-[#353132] text-[#efefef] hover:bg-[#4a4346]'
        }`}
      >
        ALL
      </button>
      {providers.map((provider) => (
        <button
          key={provider.id}
          title={provider.name}
          onClick={() => onSelect(selectedId === provider.id ? null : provider.id)}
          className={`shrink-0 w-10 h-10 rounded-xl overflow-hidden transition-all border-2 ${
            selectedId === provider.id
              ? 'border-white scale-110 shadow-lg shadow-white/20'
              : 'border-transparent opacity-70 hover:opacity-100'
          }`}
        >
          <Image
            src={provider.logo_path}
            alt={provider.name}
            width={40}
            height={40}
            className="w-full h-full object-cover"
          />
        </button>
      ))}
    </div>
  )
}
