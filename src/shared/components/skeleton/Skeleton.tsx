import type { ReactNode } from "react";
import styles from "./Skeleton.module.scss";
import clsx from "clsx";

type SkeletonProps = {
  children?: ReactNode;
  width?: number | string;
  height?: number | string;
  className?: string;
};

export function Skeleton({
  children,
  width,
  height,
  className,
}: SkeletonProps) {
  return (
    <div style={{ width, height }} className={clsx(styles.Skeleton, className)}>
      {children}
    </div>
  );
}
