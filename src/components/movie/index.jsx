import { useEffect, useState } from "react";
import MovieCard from "../movieCard";
import styles from "./styles.module.css";
import HashLoadingSpinner from "../loader/hashLoader";
const Movie = () => {
  const [movies, setMovies] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true)
      const response = await fetch("https://api.tvmaze.com/search/shows?q=all");
      const movieData = await response.json();
      setMovies(movieData);
      setLoading(false)
    };
    fetchMovies();
  }, []);
  return (
    <div className="container">
      {loading ? (
        <HashLoadingSpinner loading={loading} />
      ) : (
        <MovieCard movies={movies} />
      )}
    </div>
  );
};

export default Movie;
