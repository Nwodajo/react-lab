
import { Link } from "react-router";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.link} to="/about">
          About
        </Link>

        <Link className={styles.link} to="/todos">
          Todos
        </Link>

        <Link className={styles.link} to="/profile">
          Profile
        </Link>
      </nav>

      <button className={styles.logoutButton}>
        Log Out
      </button>
    </header>
  );
}

export default Header;