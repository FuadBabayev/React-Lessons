import { useState, useEffect } from "react";

// ! Custom Hooks just like normal JavaScript Function but it must use at least one or more React Hooks. Try to export it not export default
// ! And in order to Recognize this function as Custom Hooks we always start names with useFunctionName. And at the end it is mandatory to return States
// ! Otherwise it is gonna be a regular function in the eyes of React.
// ! Bunu diger faylda ona gore yazdiq ki her yerde(diger filelerde) cagirib islede bilek


export function useMovies(key, query /*callback*/) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    useEffect(() => {
        // if (callback) callback();
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError('');
                const response = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`, { signal: controller.signal });
                if (!response.ok) throw new Error('Something went wrong with Fetching movies');
                const data = await response.json();
                if (data.Response === 'False') throw new Error(`Movie ${query} not found!`);
                setMovies(data.Search);
                setError('');
            } catch (error) {
                if (error.name !== "AbortError") setError(error.message);
            } finally {
                setIsLoading(false);
            }

            if (query.length < 3) {
                setError('');
                setMovies([]);
                return;
            }
        };
        fetchMovies();

        return () => {
            controller.abort();                                 // ! Debounce ucundur
        };
    }, [query]);

    return { movies, isLoading, error };             // ! App.js ucun lazim olar stateleri buradan gonderdik ve orada DESCTRUCTURING ile tutaciq
    // return [movies, isLoading, error];            // ! Arrayda ola biler Objectde ve gonderdiyimizi deyerin data typesinde asili olaraq App.js-de tuturuq
}