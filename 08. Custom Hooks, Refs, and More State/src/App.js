import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
const KEY = 'a37aafc2';
// Todo: Component qurulusu her zaman bele olmalidir
// Todo: 1. useState
// Todo: 2. Functions (eventhandler ...)
// Todo: 3. useEffect

export default function App() {
  // ! RULES OF HOOKS: Only call hooks at the top level (Do not call hooks inside Conditional if else, loops, nested functions, or after early return)
  // ! Only call hooks from React functions(components) Not CLass Component or Regular Function
  // ! Whatever we passed into useState is the initial State. And React only look  at  this initial state on the initial render
  // ! If one of the hooks dissappear from list then the order of the list will get completely broken
  // Todo: useState and useRef almost similar but useRef have less power and main diffrence is that
  // ! State and Refs render boyunca davam edir, ve her defe update edende State yeniden re-render etdiyi halda Refs-ler update olmur
  // ! useRefs-den esasen DOM elementleri(click sayi), Local/Session Storage, APIler ve setTimeOut ucun istifade olunur
  // Todo: Conclusion: 
  // Todo: 1. Normal variables (const, let, var) is not persistent across renders and it doesn't trigger a re-render
  // Todo: 2. States is persistent across renders and it does trigger a re-render
  // Todo: 3. Refs is persistent across renders and it doesn't trigger a re-render

  // ! useMovies.js filesine gonderildi
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem('watched');
    return storedValue ? JSON.parse(storedValue) : [];
  });
  // const dataStorage = useRef(localStorage.setItem('watched', JSON.stringify(watched ? [...watched] : [])));
  const tempQuery = 'interstellar';
  const [query, setQuery] = useState('Regular Show');
  const {movies, isLoading, error} = useMovies(KEY, query /*handleCloseMovie*/);        
  // const [movies, isLoading, error] = useMovies(KEY, query);
  const [selectedId, setSelectedId] = useState(null);

  function handleSelectMovie(id) {
    setSelectedId((selectedId) => selectedId === id ? null : id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]));              // ! Set to LocalStorage in Event Handle
    // console.log(JSON.parse(localStorage.getItem('watched')));                          // ! Get from LocalStorage
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched));                             // ! Set to LocalStorage in useEffect
  }, [watched])

  // ! useMovies.js filesine gonderildi
  // useEffect(() => {
  //   const controller = new AbortController();
  //   async function fetchMovies() {
  //     try {
  //       setIsLoading(true);
  //       setError('');
  //       const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });
  //       if (!response.ok) throw new Error('Something went wrong with Fetching movies');
  //       const data = await response.json();
  //       if (data.Response === 'False') throw new Error(`Movie ${query} not found!`);
  //       setMovies(data.Search);
  //       setError('');
  //     } catch (error) {
  //       if (error.name !== "AbortError") setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }

  //     if (query.length < 3) {
  //       setError('');
  //       setMovies([]);
  //       return;
  //     }
  //   };
  //   fetchMovies();

  //   return () => {
  //     controller.abort();
  //   };
  // }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
        </Box>

        <Box>
          {selectedId
            ? <MovieDetails selectedId={selectedId} onCloseMovie={handleCloseMovie} onAddWatched={handleAddWatched} watched={watched} />
            : (<>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>)}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return (
    <>
      <p className="loader">Loading...</p>
    </>
  )
}
function ErrorMessage({ message }) {
  return (
    <>
      <p className="error"><span>⛔</span> {message}</p>
    </>
  )
}

function NavBar({ children }) {
  return (
    <>
      <nav className="nav-bar">
        <Logo />
        {children}
      </nav>
    </>
  )
}

function Logo() { return <div className="logo"><span role="img">🍿</span><h1>usePopcorn</h1></div> }
function NumResults({ movies }) { return <p className="num-results">Found <strong>{movies.length}</strong> results</p> }

function Search({ query, setQuery }) {
  // useEffect(()=> {
  //   const inputElement = document.querySelector('.search');
  //   inputElement.focus();
  //   // console.log(inputElement);
  // }, [])

  const inputElement = useRef(null);                // ! We shoud pass variable as props like ref={inputElement}
  useEffect(() => {                                 // ! We can only update useRef in useEffect (Updating input element)
    // console.log(inputElement);              // {current: input.search}
    // console.log(inputElement.current);      // <input class="search" type="text" ... />

    function callback(e) {
      if(document.activeElement === inputElement.current) return;     // ! Eger inputun icine foculaniriqsa restart vermesin
      if (e.code === 'Enter') {
        inputElement.current.focus();               // ! useRefElement.current = useRefElement.current + 1 (Mutation should be like this)
        setQuery('');
      }
    }
    window.addEventListener('keydown', callback);
    return () => window.addEventListener('keydown', callback);
  }, [setQuery])


  return <input className="search" type="text" placeholder="Search movies..." value={query} onChange={(e) => setQuery(e.target.value)} ref={inputElement} />
}

function Main({ children }) {
  return (
    <main className="main">
      {children}
    </main>
  )
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="box">
        <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>{isOpen ? "–" : "+"}</button>
        {isOpen && children}
      </div>
    </>
  )
}



function MovieList({ movies, onSelectMovie }) {
  return (
    <>
      <ul className="list list-movies">
        {movies && movies.map((movie) => <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />)}
      </ul>
    </>
  )
}

function Movie({ movie, onSelectMovie }) {
  return (
    <>
      <li onClick={() => onSelectMovie(movie.imdbID)}>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div><p><span>🗓</span><span>{movie.Year}</span></p></div>
      </li>
    </>
  )
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState('');
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;

  /* eslint-disable */
  // if(imdbRating > 8) [isTop, setIsTop] = useState(false); //! React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render
  // ! Hook Sirasi pozule bilmez evvel ne qeder state effect var idise bitendede eyni olmalidir
  // Todo: Sert odenmeyende prablem yoxdur eger sert odense ERROR verecek
  // if(imdbRating > 8) return <p>Greates ever!</p>  // ! Early Return Error verecek cunki ozuden sonra gelen hookslari nezere almayacaq ve say azalcaq

  // const [star, setStar] = useState(0);         // ! Her zaman 1 addim geri isleyecek
  const star = imdbRating;            // ! Derived State which (updates as component gets re-rendered) is always 1 step further from state

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    };
    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }


  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const response = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
      const data = await response.json();
      setMovie(data);
      // setStar(imdbRating);       // ! Bu vezyyetde her zaman 1 addim geri isleyecek
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `${title}`;
    return () => document.title = 'usePopcorn';
  }, [title]);

  useEffect(() => {
    function callback(e) {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    }

    document.addEventListener('keydown', callback);
    return () => document.removeEventListener('keydown', callback);
  }, [onCloseMovie]);

  return (
    <>
      <div className="details">
        {isLoading ? <Loader /> : (<>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>⬅</button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p><span>⭐️</span>{imdbRating} IMDb Rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {isWatched
                ? <p>You rated with movie {watchedUserRating} ⭐</p>
                : (<>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} defaultRating={Number(star)}
                    messages={['Bad', 'Poor', 'Unsatisfactory', 'Not Bad', 'Average', 'Satisfactory', 'Good', 'Solid', 'Excellent', 'Superb']} />
                  {userRating > 0 && <button className="btn-add" onClick={() => handleAdd()}>+ Add to List</button>}
                </>)
              }
            </div>
            <p><em>{plot}</em></p>
            <p>Starring: {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>)}
      </div>
    </>
  )
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <>
      <div className="summary">
        <h2>Movies you watched</h2>
        <div>
          <p><span>#️⃣</span><span>{watched.length} movies</span></p>
          <p><span>⭐️</span><span>{avgImdbRating.toFixed(2)}</span></p>
          <p><span>🌟</span><span>{avgUserRating.toFixed(2)}</span></p>
          <p><span>⏳</span><span>{avgRuntime} min</span></p>
        </div>
      </div>
    </>
  )
}

function WatchedMoviesList({ watched, onDeleteWatched }) {

  return (
    <>
      <ul className="list">
        {watched.map((movie) => <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />)}
      </ul>
    </>
  )
}

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <>
      <li>
        <img src={movie.poster} alt={`${movie.title} poster`} />
        <h4>{movie.title}</h4>
        <div>
          <p><span>⭐️</span><span>{movie.imdbRating}</span></p>
          <p><span>🌟</span><span>{movie.userRating}</span></p>
          <p><span>⏳</span><span>{movie.runtime} min</span></p>
          <button onClick={() => onDeleteWatched(movie.imdbID)} className="btn-delete">X</button>
        </div>
      </li>
    </>
  )
}
