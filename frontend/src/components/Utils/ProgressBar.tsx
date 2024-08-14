export function ProgressBar({movies, series, episodes}: {movies: number, series: number, episodes: number}) {
    const total = movies + series + episodes;

    const moviePercentage = (movies / total) * 100;
    const seriesPercentage = (series / total) * 100;
    const episodePercentage = (episodes / total) * 100;

    return (
        <div className="font-clashBold w-full h-6 flex rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 relative">
            {
                movies > 0 && (
                    <div style={{width: `${moviePercentage}%`}} className="bg-blue-700 flex items-center justify-center relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-sm">{`M (${movies})`}</span>
                    </div>
                )
            }
            {
                series > 0 && (
                    <div style={{width: `${seriesPercentage}%`}} className="bg-green-400 flex items-center justify-center relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-sm truncate">{`S (${series})`}</span>
                    </div>

                )
            }
            {

                episodes > 0 && (
                    <div style={{width: `${episodePercentage}%`}} className="bg-red-500 flex items-center justify-center relative">
                        <span className="absolute inset-0 flex items-center justify-center text-white text-sm">{`E (${episodes})`}</span>
                    </div>
                )
            }
        </div>
    );
}
