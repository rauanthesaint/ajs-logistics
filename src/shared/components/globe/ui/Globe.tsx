import type { ReactNode } from "react";
import { useGlobe, type GlobeOptions } from "../model";

type GlobeProps = {
  options?: GlobeOptions;
  className?: string;
  children?: ReactNode;
};

export default function Globe({
  className,
  children,
  options = {},
}: GlobeProps) {
  const ref = useGlobe(options);

  return (
    <svg
      ref={ref}
      style={{
        aspectRatio: 1,
        overflow: "visible",
        minWidth: 400,
      }}
      className={className}
    >
      <g data-globe-root />
      {children}
    </svg>
  );
}
