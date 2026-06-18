import { Container } from "@/shared/components/container";
import styles from "./RootLayout.module.scss";
import { Link } from "react-router-dom";

type NavigationItem = {
  title: string;
  to: string;
};

const navigation: NavigationItem[] = [
  {
    title: "Услуги",
    to: "/services",
  },
  {
    title: "География",
    to: "/routes",
  },
  {
    title: "Кейсы",
    to: "/portfolio",
  },
  {
    title: "FAQ",
    to: "/",
  },
];

export function Header() {
  return (
    <header className={styles.Header}>
      <Container className={styles.container}>
        <Link to={"/"}>Logo</Link>

        <nav>
          <ul className={styles.Navigation}>
            {navigation.map(({ to, title }, index) => {
              return (
                <li key={index}>
                  <Link to={to} className={styles.NavigationItem}>
                    <span>{title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
