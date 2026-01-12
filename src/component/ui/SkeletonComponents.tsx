import { Skeleton } from "./Skeleton"

export const ProductSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3 p-4 bg-white rounded-lg border border-gray-100 shadow-sm">
            <Skeleton className="h-[180px] w-full rounded-md" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="flex justify-between items-center mt-2">
                <div className="space-y-1">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-8 w-8 rounded-full" />
            </div>
        </div>
    )
}

export const NewsCardSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-md aspect-[4/3]" />
            <div className="space-y-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-4/5" />
            </div>
            <Skeleton className="h-3 w-32" />
            <div className="space-y-1">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    )
}

export const NewsSidebarSkeleton = () => {
    return (
        <div className="space-y-10">
            <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-5 w-full" />
                    ))}
                </div>
            </div>
            <div>
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex gap-3">
                            <Skeleton className="h-16 w-16 flex-shrink-0" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const ProductGridSkeleton = ({ count = 10 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <ProductSkeleton key={i} />
            ))}
        </div>
    )
}

export const MenuSkeleton = () => {
    return (
        <div className="flex items-center bg-white rounded-lg mb-4 h-12 px-4 space-x-6 shadow-sm">
            {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-4 w-24" />
            ))}
        </div>
    )
}

export const FullPageSkeleton = () => {
    return (
        <div className="w-full space-y-8">
            <MenuSkeleton />
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-48" />
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-8 w-20 rounded-full" />
                        ))}
                    </div>
                </div>
                <ProductGridSkeleton count={10} />
            </div>
        </div>
    )
}
