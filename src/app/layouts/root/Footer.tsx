import { Container } from "@/shared/components/container";
import styles from "./RootLayout.module.scss";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className={styles.Footer}>
      <Container className={styles.container}>
        <Link to={"/"}>Logo</Link>
        <span className="muted">&copy; AJS Logistics, 2026</span>
      </Container>
    </footer>
  );
}
