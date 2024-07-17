import Drawer from "@/components/SideBar";

export default function LandingPage() {
    return (
        <div className="flex flex-row">
            <Drawer />
            <main className="w-full">
                <div className="p-4">
                    <div className="rounded-md border-purple-600 border-2 w-full p-4">
                        <span className="text-3xl">Welcome to <span className="text-red-500">House Finder</span></span>
                        <span className="flex flex-col mt-10">
                            <br />
                            <span>Browse movies, add them to watchlist and share them with friends </span>
                            <br />
                            <span>Just click the plus to add a movie to see more details to mark the movie as watched</span>
                        </span>
                    </div>
                </div>
            </main>
        </div>
    )
}
