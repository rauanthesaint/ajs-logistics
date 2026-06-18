import { Outlet } from "react-router-dom";
import styles from "./RootLayout.module.scss";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function RootLayout() {
  return (
    <div className={styles.RootLayout}>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
