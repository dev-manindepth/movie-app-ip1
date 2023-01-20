import { Link } from "react-router-dom";
import styles from "./styles.module.css";
const MovieCard = ({ movies }) => {
  return (
    <div className={styles.movieContainer}>
      {movies &&
        movies.map((movie) => {
          return (
            <Link
              to={`/movie/${movie.show.id}`}
              key={movie.id}
              className={styles.movie}
            >
              <div className={styles.movie__genres}>
                {movie.show.genres.map((genre) => (
                  <div key={genre} className={styles.movie__genre}>
                    {genre}
                  </div>
                ))}
              </div>
              <img
                className={styles.movie__image}
                src={movie.show.image?.medium}
                alt=""
              />
              {movie.show.rating.average && (
                <div className={styles.movie__rating}>
                  ⭐{movie.show.rating.average}
                </div>
              )}
              <div className={styles.movie__name}>{movie.show.name}</div>
            </Link>
          );
        })}
    </div>
  );
};

export default MovieCard;
