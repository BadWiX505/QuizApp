"use client"

export function Timer() {
  // 5 minutes in seconds
  const totalSeconds = 5 * 60
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative w-20 h-20">
        {/* Circular background */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
          {/* Progress circle - static for frontend only */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="url(#timerGradient)"
            strokeWidth="8"
            strokeDasharray="282.7"
            strokeDashoffset="0"
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
          </defs>
        </svg>

        {/* Time display in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">
              {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      <div className="text-sm font-semibold text-gray-700">Time Remaining</div>
    </div>
  )
}
