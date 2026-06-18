import type { ReactNode } from "react";
import styles from "./Section.module.scss";
import clsx from "clsx";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps) {
  return (
    <section className={clsx(styles.Section, className)}>{children}</section>
  );
}
