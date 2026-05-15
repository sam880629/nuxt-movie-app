import { Skeleton } from '@heroui/react'

export default function MovieCardSkeleton() {
  return (
    <div className="bg-[#353132] border border-[#4e484a] rounded-xl p-3 sm:p-4 flex flex-col opacity-80">
      <div className="flex gap-2 justify-between items-center pr-2">
        <Skeleton className="h-8 rounded-3xl w-3/4" />
        <Skeleton className="shrink-0 w-9 h-9 rounded-full" />
      </div>
      <Skeleton className="mt-3 w-full rounded-xl aspect-2/3" />
    </div>
  )
}
