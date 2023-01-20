import { Link, useParams } from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';

const Episode = ({episode}) => {
  const [loading,setLoading] = useState(false);
  return (
    <Link to={`/episodes/${episode.id}`}>
      <div className={styles.episode}>
        
          {episode?.rating?.average ? <div className={styles.episode__rating}>⭐ {episode.rating.average}</div>:''}
        
        {
          episode.image ? <img src={episode?.image.medium} alt="" /> : <div className={styles.noimage}>No Image Found</div>
        }
        <p className={styles.episode__name}>{episode.name}</p>
      </div>
    </Link>
  );
}

export default Episode