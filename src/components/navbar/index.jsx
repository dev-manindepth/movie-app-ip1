import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Navbar = () => {
  return (
    <header className="container">
      <nav className={styles.navbar}>
        <Link to={'/'} className={styles.logo}>MovieMania</Link>
      </nav>
    </header>
  );
};

export default Navbar;
