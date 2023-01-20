import { HashLoader } from 'react-spinners';
import styles from './style.module.css';

const HashLoadingSpinner = ({loading}) => {
  return (
    <div className={styles.loader}>
      <HashLoader color="#537895" loading={loading} />
    </div>
  );
}

export default HashLoadingSpinner