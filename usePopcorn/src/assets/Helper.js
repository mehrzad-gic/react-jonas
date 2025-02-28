// Helper function to check if a movie exists in localStorage and return the list
function checkExist(movie) {
    const storage = JSON.parse(localStorage.getItem('movies')) || [];
    const exists = storage.some((val) => val.imdbID === movie.imdbID);
    return { exists, storage };
}


// Add a movie to localStorage
export function addToLocalStorage(movie) {

    const { exists, storage } = checkExist(movie);

    if (exists) {
        throw new Error('Movie already exists in storage');
    }

    storage.push(movie); // Add the new movie to the list

    localStorage.setItem('movies', JSON.stringify(storage));

    console.log();
    
}


// Delete a movie from localStorage
export function deleteFromLocalStorage(movie) {

    const { exists, storage } = checkExist(movie);

    if (!exists) {
        throw new Error('404 - Movie Not Found');
    }

    const newList = storage.filter((val) => val.imdbID !== movie.imdbID);
    localStorage.setItem('movies', JSON.stringify(newList));

}


// All Movies
export function All(){

    const movies = JSON.parse(localStorage.getItem('movies')) || [];

    return movies
}