export default function Header({ setQuery,movieslength }) {
    return (
        <nav className="nav-bar">
            <div className="logo">
                <span role="img">🍿</span>
                <h1>usePopcorn</h1>
            </div>
            <input
                className="search"
                type="text"
                placeholder="Search movies..."
                onChange={(e) => setQuery(e.target.value)}
            />
            <p className="num-results">
                Found <strong>{movieslength}</strong> results {movieslength > 0 ? "😁" : "😓"}
            </p>
        </nav>
    );
}