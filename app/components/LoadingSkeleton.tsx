"use client"

const LoadingSkeleton = () => (
  <div className="w-full min-h-[200px] space-y-8">
    {/* Banner Skeleton */}
    <div className="relative w-full h-[42vh] bg-gray-200 dark:bg-gray-800 animate-pulse">
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-background to-transparent">
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 space-y-3">
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full" />
          <div className="h-8 md:h-12 w-64 md:w-96 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="space-y-1">
            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-36 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="h-12 w-80 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>

    {/* Content Rows Skeleton */}
    <div className="space-y-12">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4 px-4">
          <div className="h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((j) => (
              <div
                key={j}
                className="flex-none w-[200px] h-[300px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default LoadingSkeleton 