import Movie from './Movie';
import Error from './Error';
import Loading from './Loading';

export default function Movies({ movies, isLoading, error, setSelectedMovie }) {
  return (
    <ul className="list list-movies">
      {isLoading && <Loading loader={'Loading ...'} />}
      {error && <Error error={error} />}
      {!isLoading && !error && movies.length === 0 && <h2 className='error'>No movies found.</h2>}
      {!isLoading &&
        !error && movies.length > 0 &&
        movies.map((movie) => (
          <Movie setSelectedMovie={setSelectedMovie} movie={movie} key={movie.imdbID} />
        ))}
    </ul>
  );
}