"use client"

import { formatSecondsToMMSS } from "@/lib/utils"

export function Timer({time} : {time : number | undefined}) {
  // 5 minutes in seconds
    return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">
              {formatSecondsToMMSS(time)}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm font-semibold text-gray-700">Time Remaining</div>
    </div>
  )
}
