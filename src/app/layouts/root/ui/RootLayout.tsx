import { Link, Outlet } from "react-router-dom";
import styles from "./RootLayout.module.scss";
import { Footer } from "./Footer";
import { Container } from "@/shared/components/container";
import { Navigation } from "./Navigation";
import { Button } from "@/shared/components/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, SunIcon } from "@hugeicons/core-free-icons";

export function RootLayout() {
  return (
    <div className={styles.RootLayout}>
      <header className={styles.Header}>
        <Container className={styles.container}>
          <div className={styles.block}>
            <Link to={"/"}>
              <img className={styles.Logo} src="/logo.svg" alt="AJS Logo" />
            </Link>
            <Navigation />
          </div>
          <div className={styles.block}>
            <Button isIcon size="sm" variant="ghost">
              <HugeiconsIcon icon={SunIcon} />
            </Button>
            <Button size="sm" variant="ghost">
              <span>RU</span>
              <HugeiconsIcon icon={ArrowDown01Icon} />
            </Button>
          </div>
        </Container>
      </header>
      <Outlet />
      <Footer />
    </div>
  );
}
