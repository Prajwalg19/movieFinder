export default function Info() {
    return (
        <div className="flex flex-col max-w-5xl mx-auto w-full mt-10 px-4 sm:px-6 lg:px-8" id="info">
            <span className="flex w-full flex-col gap-20">
                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex-1 order-2 md:order-1 flex flex-col items-start justify-center mb-6 md:mb-0">
                        <p className="font-clashSemiBold text-3xl mb-4 text-red-700 mt-10 md:mt-0 self-center md:self-start">Purpose</p>
                        <p className="text-base font-clashRegular font-medium text-center md:text-start md:text-lg">
                            Welcome to Movie Finder! Our goal is to provide you with detailed information about your favorite movies, series, and episodes. Whether you're looking to read plots, check release years, or explore cast and crew details, Movie Finder has got you covered. Use our search feature to dive into the world of entertainment and discover new favorites.
                        </p>
                    </div>
                    <div className="flex-1 order-1 md:order-2 flex justify-center md:justify-end">
                        <img src="/dog.jpeg" alt="image" className="rounded-full h-[300px] w-[300px] object-contain" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex-1 flex justify-center md:justify-start items-center mb-6 md:mb-0">
                        <img src="/popcorn.jpeg" alt="image" className="rounded-full h-[300px] w-[300px] object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-center">
                        <p className="font-clashSemiBold text-3xl mb-4 mt-10 md:mt-0 self-center md:self-start text-red-700">Features</p>
                        <span className="text-base font-clashSemiBold text-center md:text-start md:text-lg">
                            Our platform allows you to:
                            <ul className="list-disc list-inside ml-4 mt-2 text-base md:text-lg font-clashRegular font-medium">
                                <li>Search for movies, series, and episodes by name or year of release.</li>
                                <li>Read detailed plots and synopses.</li>
                                <li>Discover cast and crew information.</li>
                                <li>Explore related movies and series based on your interests.</li>
                                <li>Access ratings and reviews to help you decide what to watch next.</li>
                            </ul>
                        </span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex-1 order-2 md:order-1 flex flex-col items-start justify-center mb-6 md:mb-0">
                        <p className="font-clashSemiBold text-3xl mb-4 mt-10 md:mt-0 self-center md:self-start text-red-700">About Us</p>
                        <p className="text-base font-clashRegular font-medium text-center md:text-start md:text-lg">
                            Movie Finder was created by a team of passionate movie enthusiasts who wanted to make it easier for people to find information about their favorite films and shows. We are constantly updating our database to bring you the latest and most accurate information available. Our mission is to enhance your viewing experience by providing a comprehensive and user-friendly platform.
                        </p>
                    </div>
                    <div className="flex-1 order-1 md:order-2 flex items-center justify-center md:justify-end">
                        <img src="/Banner.jpeg" alt="image" className="rounded-full h-[300px] w-[300px] object-cover" />
                    </div>
                </div>
            </span>
        </div>
    );
}
