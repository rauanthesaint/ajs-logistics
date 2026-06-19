import type { ReactNode } from "react";
import { GlobeContext, useGlobe, VIEWBOX, type GlobeOptions } from "../model";

type GlobeProps = {
  options?: GlobeOptions;
  className?: string;
  children?: ReactNode;
};

export function Globe({ className, children, options = {} }: GlobeProps) {
  const { ref, store } = useGlobe(options);

  return (
    <GlobeContext.Provider value={store}>
      <svg
        ref={ref}
        viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
        className={className}
        style={{
          aspectRatio: 1,
          overflow: "visible",
          minWidth: 400,
        }}
      >
        <g data-globe-root />
        {children}
      </svg>
    </GlobeContext.Provider>
  );
}
