import { Link, Outlet } from "react-router-dom";
import styles from "./RootLayout.module.scss";
import { Footer } from "./Footer";
import { Container } from "@/shared/components/container";
import { Navigation } from "./Navigation";

export function RootLayout() {
  return (
    <div className={styles.RootLayout}>
      <header className={styles.Header}>
        <Container className={styles.container}>
          <Link to={"/"}>
            <img className={styles.Logo} src="/logo.svg" alt="AJS Logo" />
          </Link>
          <Navigation />
        </Container>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}
