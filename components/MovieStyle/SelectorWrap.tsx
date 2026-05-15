'use client'

import { useState } from 'react'

interface Props {
  onOptionSelected: (option: string) => void
}

export default function SelectorWrap({ onOptionSelected }: Props) {
  const [selected, setSelected] = useState<'day' | 'week'>('day')

  const selectOption = (option: 'day' | 'week') => {
    if (selected === option) return
    setSelected(option)
    onOptionSelected(option)
  }

  return (
    <div className="px-5 w-full bg-[#211c1e] pt-5 flex items-center">
      <h1 className="text-white text-2xl font-bold mr-5">熱門電影</h1>
      <div className="flex flex-row justify-between items-center border rounded-3xl box-border w-fit relative">
        <div
          className={`rounded-3xl border-2 absolute bg-cyan-950 w-18 h-7 m-0.75 ${
            selected === 'day' ? 'select_day' : 'select_week'
          }`}
        />
        <div className="select_btn" onClick={() => selectOption('day')}>Day</div>
        <div className="select_btn" onClick={() => selectOption('week')}>Week</div>
      </div>
    </div>
  )
}
