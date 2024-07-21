import {Accordion} from "flowbite-react";

export default function FAQ() {
    return (
        <div className="max-w-5xl font-clashSemiBold w-full mx-auto px-4 sm:px-6 lg:px-8 mt-10" id="faq">
            <h1 className="text-4xl font-clashSemiBold mb-10 text-center">FAQ</h1>
            <Accordion>
                <Accordion.Panel>
                    <Accordion.Title>What is Movie Finder?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Movie Finder is an online platform that allows users to search for detailed information about movies, series, and episodes. Users can read plots, check release years, and explore cast and crew details.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>How do I search for a movie or series?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Simply enter the name of the movie or series in the search bar on the homepage. You can also refine your search by specifying the year of release.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>Can I find information about TV episodes?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Yes, Movie Finder provides detailed information about individual TV episodes, including their plots, air dates, and cast information.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>Is the information on Movie Finder up-to-date?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Database is updated with the latest information as data is sourced from the OMDB API, which is regularly updated to ensure accuracy.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>Is Movie Finder free to use?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            Yes, Movie Finder is completely free to use. You can search for and access detailed information about movies, series, and episodes without any charges.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>How can I get more information about a movie or series?</Accordion.Title>
                    <Accordion.Content>
                        <p className="mb-2 text-gray-500 dark:text-gray-400">
                            For more detailed information about a specific movie or series, simply click on the title in the search results. You will be redirected to a page with comprehensive details, including plot summaries, cast lists, and reviews.
                        </p>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
}
