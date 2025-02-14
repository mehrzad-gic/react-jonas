import { useEffect, useState } from 'react';
import Header from './components/Header';
import './assets/index.css';
import Container from './components/Container';
import { KEY, tempMovieData, tempWatchedData } from './utils';
import Box from './components/Box';
import Movies from './components/Movies';
import WatchedSummary from './components/WatchedSummary'; // Fixed typo
import MovieDetail from './components/MovieDetail';

function App() {
  const [movies, setMovies] = useState([]); // Initialize as an empty array
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(null);

        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`);
        const data = await res.json();

        if (!res.ok) throw new Error('Something went wrong while fetching movies');
        if (data.Response === 'False') throw new Error(data.Error);

        setMovies(data.Search || []); // Ensure data.Search is an array
      } catch (e) {
        setError(e.message);
        setMovies([]); // Reset movies to an empty array on error
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length > 2) {
      fetchMovies();
    } else {
      setMovies([]); // Clear movies if query is too short
    }
  }, [query]);

  return (
    <>
      <Header setQuery={setQuery} movieslength={movies.length} />
      <Container>
        <Box>
          <Movies isLoading={isLoading} setSelectedMovie={setSelectedMovie} error={error} movies={movies} />
        </Box>

        <Box>
          {selectedMovie ? (
            <MovieDetail selectedMovie={selectedMovie} setSelectedMovie={setSelectedMovie} />
          ) : (
            <>
              <WatchedSummary watched={watched} /> {/* Pass watched data */}
              <Movies movies={watched} setSelectedMovie={setSelectedMovie} />
            </>
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;