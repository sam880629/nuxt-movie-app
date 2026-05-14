'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

export default function AppHeader() {
  const router = useRouter()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      if (val.trim() !== '') {
        router.push(`/search?name=${encodeURIComponent(val)}`)
      } else {
        router.push('/')
      }
    }, 800)
  }

  return (
    <div className="relative">
      <img
        className="z-1 absolute w-full h-full top-0 left-0 object-cover"
        src="/image/home_background.jpg"
        alt="background"
      />
      <div className="flex flex-col gap-10 items-start md:items-center">
        <div className="pt-10 px-5 text-white font-bold relative z-10 flex flex-col gap-3">
          <Link href="/">
            <p className="md:text-center text-3xl">CinemaHub</p>
          </Link>
          <p className="text-lg text-[#efefef] opacity-85">Your Ultimate Movie Destination</p>
        </div>
        <div className="px-5 mb-10 text-[#efefef] z-10 w-full md:w-8/12 lg:w-6/12 relative">
          <span className="absolute top-1/2 left-2 translate-y-[-50%] px-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path
                stroke="#737373"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.333"
                d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
              />
            </svg>
          </span>
          <input
            className="textInput border border-[#4e484a] rounded-md h-[50px] bg-[#353132] text-sm md:text-lg pl-8 py-[12px] w-full outline-none text-[#efefef]"
            type="text"
            placeholder="Search for movies..."
            onChange={handleInput}
          />
        </div>
      </div>
    </div>
  )
}
