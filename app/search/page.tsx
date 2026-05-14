import { Suspense } from 'react'
import SearchContent from './SearchContent'

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[520px] bg-[#211c1e] text-white flex justify-center items-center flex-col">
          <div className="la-ball-clip-rotate" />
          <p>loading.....</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  )
}
