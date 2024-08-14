export type movieSearchType = { // response on search for name, type, or year
    Title: string;
    Year: string | null;
    imdbID: string;
    Type: "movie" | "series" | "episode";
    Poster: string | null;
} | null



interface Rating {
    Source: string;
    Value: string;
}

export interface movieSpecificType { // response on search for specific movie using it's imdb id.
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: Rating[];
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    Error?: String
}

export interface SearchParams { // search params for OMDB API
    searchTerm: string;
    page: number;
    plot: string | null;
    year: string | null;
    type: string | null;
}
