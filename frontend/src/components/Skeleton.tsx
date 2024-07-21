const shimmer = 'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function SwiperSlideSkeleton() {
    return (
        <div className= {`${shimmer} relative w-full h-full overflow-hidden rounded-lg shadow-lg bg-gray-300 dark:bg-gray-800`
}>
    <div className="absolute inset-0 flex justify-center items-center" >
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700" >
            </div>
            </div>
            </div>
    )
};

