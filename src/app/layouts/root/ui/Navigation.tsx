import styles from "./RootLayout.module.scss";
import { Link } from "react-router-dom";
import { navigation } from "../model";

export function Navigation() {
  return (
    <nav>
      <ul className={styles.Navigation}>
        {navigation.map(({ to, title }, index) => {
          return (
            <li key={index} className={styles.NavigationItem}>
              <Link to={to}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
