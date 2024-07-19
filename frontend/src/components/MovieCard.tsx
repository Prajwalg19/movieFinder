import {movieSearchType} from "@/utils/types";
import {Link} from "react-router-dom";

export default function MovieCard({
    prop
}: {prop: movieSearchType}) {
    return (
        <div className="group relative w-[350px] border border-teal-500 hover:border-2 h-[520px] overflow-hidden rounded-lg transition-all">
            <Link to={`/movie/${prop?.imdbID}`}>
                <img src={prop && prop?.Poster != "N/A" ? prop.Poster + "x" : "/ImagePlaceholder.png"} alt="post cover" className="h-[400px] w-full object-cover group-hover:h-[300px] transition-all duration-300"
                />
            </Link>
            <div className="p-3 flex flex-col gap-2">
                <Link to={`/movie/${prop?.imdbID}`} className="text-lg font-semibold line-clamp-2">{prop?.Title}</Link>
                <Link
                    to={`/movie/${prop?.imdbID}`}
                    className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
                >
                    Details
                </Link>
            </div>
        </div>

    )

}
