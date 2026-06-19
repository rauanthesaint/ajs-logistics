import { Container } from "@/shared/components/container";
import styles from "./RootLayout.module.scss";
import { Link } from "react-router-dom";

export function Footer() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer className={styles.Footer}>
      <Container className={styles.container}>
        <Link to={"/"}>
          <img className={styles.Logo} src="/logo-alt.svg" alt="AJS Logo" />
        </Link>
        <span className="muted">&copy; ТОО "AJS Logistics", {currentYear}</span>
      </Container>
    </footer>
  );
}
