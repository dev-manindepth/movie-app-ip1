import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { useState } from "react";
import HashLoadingSpinner from "../loader/hashLoader";
import Episode from "../episode";
import FormModal from "../formModal";

const MovieDetailPage = () => {
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(false);
  const [prevEpisode, setPrevEpisode] = useState();
  const [nextEpisode, setNextEpisode] = useState();
  const [error, setError] = useState();
  const [showForm, setShowForm] = useState(false);
  const { movieId } = useParams();
  const initialValues = {
    noOfSeats: 2,
    movieName: movie?.name,
    email: "",
    name: "",
  };
  const [formData, setFormData] = useState(initialValues);
  const getNextEpisodeId = () => {
    const episodeLink = movie && movie._links?.nextepisode?.href;
    if (!episodeLink) {
      return null;
    }
    const episodeId = episodeLink.split("/").pop();
    return episodeId;
  };
  const getPrevEpisodeId = () => {
    const episodeLink = movie && movie._links?.previousepisode?.href;
    if (!episodeLink) {
      return null;
    }
    const episodeId = episodeLink.split("/").pop();
    return episodeId;
  };

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${movieId}`);
        const movieData = await response.json();
        setMovie(movieData);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
      }
    };
    fetchMovie();
  }, []);
  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      setFormData(formData);
    }
  }, []);
  useEffect(() => {
    const nextEpisodeId = getNextEpisodeId();
    const prevEpisodeId = getPrevEpisodeId();
    const fetchEpisode = async (episodeId) => {
      const response = await fetch(
        `https://api.tvmaze.com/episodes/${episodeId}`
      );
      const episodeData = await response.json();
      return episodeData;
    };
    if (nextEpisodeId) {
      const episodeData = fetchEpisode(nextEpisodeId).then((data) =>
        setNextEpisode(data)
      );
    }
    if (prevEpisodeId) {
      const episodeData = fetchEpisode(prevEpisodeId).then((data) =>
        setPrevEpisode(data)
      );
    }
  }, [movie]);
  const movieYear = movie && movie.premiered && movie.premiered.split("-")[0];
  const convertMovieTime = () => {
    const time = movie && movie.averageRuntime;
    // const time = 240;
    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return { hours, minutes };
  };

  const formattedSummary = movie && movie.summary.replace(/(<([^>]+)>)/gi, "");
  const movieWatchTime = convertMovieTime();
  return (
    <div>
      {loading ? (
        <HashLoadingSpinner loading={loading} />
      ) : (
        movie && (
          <div className={styles.movie}>
            <div className={styles.movie__container}>
              <div className={styles.movie__image__container}>
                <img src={movie.image.original} alt="" />
              </div>
              <div className={styles.movie__details__container}>
                <h1>{movie.name}</h1>
                <div>
                  <span>{movieYear}</span> |{" "}
                  <span>{`${movieWatchTime.hours}hr ${
                    movieWatchTime.minutes ? `${movieWatchTime.minutes}min` : ""
                  }`}</span>{" "}
                  | <span>{movie.language}</span> |
                  <span>⭐{movie.rating.average}</span>
                </div>
                <hr />
                <div className={styles.movie__genre}>
                  Genre 🎞
                  {movie.genres &&
                    movie.genres.map((genre, i) => {
                      if (i === movie.genres.length - 1) {
                        return <span key={genre}>{genre}</span>;
                      }
                      return <span key={genre}>{genre} |</span>;
                    })}
                </div>
                <hr />
                <div>{formattedSummary}</div>
                <button onClick={() => setShowForm(true)}>Buy Ticket</button>
                {showForm && (
                  <FormModal
                    setShowForm={setShowForm}
                    formData={formData}
                    setFormData={setFormData}
                  />
                )}
                {nextEpisode && (
                  <>
                    {" "}
                    <h2>Next Episode</h2> <Episode episode={nextEpisode} />{" "}
                  </>
                )}
                {prevEpisode && (
                  <>
                    {" "}
                    <h2>Previous Episode</h2>
                    <Episode episode={prevEpisode} />
                  </>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MovieDetailPage;
