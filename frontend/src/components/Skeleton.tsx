const shimmer = 'animate-pulse before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function SwiperSlideSkeleton() {
    return (
        <div className={`${shimmer} relative w-full h-full overflow-hidden rounded-lg shadow-lg border border-gray-300 dark:border-0 bg-gray-300 dark:bg-gray-800`
        }>
            <div className="absolute inset-0 flex justify-center items-center" >
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700" >
                </div>
            </div>
        </div>
    )
};


export function SearchPageSkeleton() {
    return (
        <div className="min-h-screen text-black dark:text-slate-100 scroll-mt-10" id="top">
            <div className="flex flex-col items-center gap-10 py-10">
                <div className="flex justify-center w-full flex-wrap gap-10 px-3">
                    {Array(10).fill(0).map((_, index) => (
                        <div key={index} className="w-[350px] h-[480px]">
                            <SwiperSlideSkeleton />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
