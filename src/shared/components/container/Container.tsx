import clsx from "clsx";
import type { ReactNode } from "react";
import styles from "./Container.module.scss";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={clsx(styles.Container, className)}>{children}</div>;
}
