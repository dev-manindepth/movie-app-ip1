import styles from "./style.module.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import HashLoadingSpinner from "../loader/hashLoader";

const EpisodeDetailedPage = () => {
  const { episodeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [episode, setEpisode] = useState();
  const [show, setShow] = useState();
  const getShow = () => {
    const showLink = episode && episode._links?.show?.href;
    if (!showLink) {
      return null;
    }
    const showId = showLink.split("/").pop();
    return showId;
  };
  useEffect(() => {
    const fetchEpisode = async () => {
      setLoading(true);
      const response = await fetch(
        `https://api.tvmaze.com/episodes/${episodeId}`
      );
      const episodeData = await response.json();
      setEpisode(episodeData);
      setLoading(false);
    };
    fetchEpisode();
  }, []);
  useEffect(() => {
    const showId = getShow();
    const fetchShow = async () => {
      const response = await fetch(`https://api.tvmaze.com/shows/${showId}`);
      const showData = await response.json();
      setShow(showData);
    };

    if (showId) {
      fetchShow(showId);
    }
  }, [episode]);
  const episodeYear =
    episode && episode.airdate && episode.airdate.split("-")[0];
  const convertepisodeTime = () => {
    const time = episode && episode.runtime;

    const hours = Math.trunc(time / 60);
    const minutes = time % 60;
    return { hours, minutes };
  };
  const formattedSummary =
    episode && episode.summary.replace(/(<([^>]+)>)/gi, "");
  const episodeWatchTime = convertepisodeTime();
  return (
    <div>
      {loading ? (
        <HashLoadingSpinner loading={loading} />
      ) : (
        episode && (
          <div className={styles.episode}>
            <div className={styles.episode__image__container}>
              {episode?.image && episode?.image?.original ? (
                <img src={episode.image.original} alt="" />
              ) : (
                <div className={styles.noimage}>No Image Found</div>
              )}
            </div>
            <div className={styles.episode__details__container}>
              <h1>{episode.name}</h1>
              <div>
                <span>{episodeYear}</span> |{" "}
                <span>{`${episodeWatchTime.hours}hr ${
                  episodeWatchTime.minutes && `${episodeWatchTime.minutes}min`
                } |`}</span>{" "}
                {episode?.season && <span>| Season {episode.season} </span>}{" "}
                {episode?.rating && episode.rating?.average && (
                  <span>| ⭐{episode.rating.average}</span>
                )}
              </div>
              <hr />
              <p>{formattedSummary}</p>
              {show && show?.image && show.image?.medium && (
                <div className={styles.show}>
                  <h2>From the Show : {show.name}</h2>
                  <Link to={`/movie/${show.id}`}>
                    <div className={styles.show__image}>
                      <img src={show.image.medium}></img>
                    </div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default EpisodeDetailedPage;
