import {HiArrowLongRight} from "react-icons/hi2"
export default function Intro() {
    return (
        <div className="flex flex-col max-w-2xl gap-10 mx-auto items-center sm:mt-20">
            <div className="flex flex-col">
                <h1 className="sm:text-6xl text-6xl font-clashBold text-center"><span className="text-red-700">Movie </span>Finder </h1>
                <p className="text-center font-clashRegular">Know about your favourite movies</p>

            </div>
            <span className="flex sm:flex-row justify-around px-5 gap-7 sm:gap-0 w-full flex-col">
                <button type="button" className="dark:border-gray-300/40 border py-3 w-full shadow-md sm:w-[190px] box-border whitespace-nowrap px-7 group bg-black rounded-sm text-white flex flex-row justify-center items-center hover:scale-105 transition gap-2 font-clashSemiBold tracking-wider">
                    <span >Get Started</span>
                    <span><HiArrowLongRight className="text-gray-300 text-2xl group-hover:translate-x-2 transition ease-in-out" /></span>
                </button>

                <button type="button" className="dark:border-gray-300/40 border py-3 w-full shadow-md sm:w-[190px] box-border whitespace-nowrap px-7 group bg-red-700 rounded-sm text-white flex flex-row justify-center items-center hover:scale-105 transition gap-2 font-clashSemiBold tracking-wider">
                    <span >Know More</span>
                    <span><HiArrowLongRight className="text-gray-300 text-2xl group-hover:translate-x-2 transition ease-in-out" /></span>
                </button>
            </span>
        </div>
    )

}


