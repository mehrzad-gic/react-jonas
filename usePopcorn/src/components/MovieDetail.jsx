import { useEffect, useState } from "react"
import Error from "./Error";
import Loading from "./Loading";
import { KEY } from '../utils'
import StarRating from "./StarRating";

export default function MovieDetail({ selectedMovie,setSelectedMovie }) {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [movie, setMovie] = useState(null);

    useEffect(() => {

        async function fetchMovie() {

            try {

                setIsLoading(true);
                setError(null);

                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovie}`);
                const data = await res.json()

                if (!res.ok) throw new Error('something went wrong while fetching movies')
                if (data.Response == 'False') throw new Error(data.Error)

                setMovie(data)
                // console.log(data.Search);

            } catch (e) {
                setMovie(null);
                setError(e.message)
            }finally {
                setIsLoading(false); // Ensure isLoading is false after fetch
            }

        }

        fetchMovie();
        
    }, [selectedMovie])

    return (
        <>
            <div className="details">
                {isLoading ? (
                    <Loading loader={"Loading ....."}/>
                ) : movie ? ( // Check if movie is defined
                    <>
                        <header>
                            <button className="btn-back" onClick={() => setSelectedMovie(null)}>
                                &larr;
                            </button>
                            <img
                                src={movie.Poster === "N/A" ? "default-poster-url.jpg" : movie.Poster}
                                alt={`Poster of ${movie.Title} movie`}
                            />
                            <div className="details-overview">
                                <h2>{movie.Title}</h2>
                                <p>
                                    {movie.Released} &bull; {movie.Runtime}
                                </p>
                                <p>{movie.Genre}</p>
                                <p>
                                    <span>⭐️</span>
                                    {movie.imdbRating} IMDb rating
                                </p>
                            </div>
                        </header>
                        <section>
                            
                            <p>
                                <em>{movie.Plot}</em>
                            </p>
                            <p>Starring {movie.Actors}</p>
                            <p>Directed by {movie.Director}</p>
                        </section>
                    </>
                ) : (
                    <h2 className="error">No movie data available.</h2>
                )}
            </div>
            {error && <Error error={error} />}
        </>
    );
}