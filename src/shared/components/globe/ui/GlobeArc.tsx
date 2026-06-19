import { useMemo } from "react";
import { useSyncExternalStore } from "react";
import { geoInterpolate, geoDistance } from "d3";
import { useGlobeContext } from "../model";

type GlobeArcProps = {
  from: [number, number]; // [lon, lat]
  to: [number, number];
  stroke?: string;
  strokeWidth?: number;
  segments?: number; // точек на дуге, чем больше тем плавнее
};

export function GlobeArc({
  from,
  to,
  stroke = "var(--color-neutral-500)",
  strokeWidth = 1.5,
  segments = 64,
}: GlobeArcProps) {
  const store = useGlobeContext();
  const { projection } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
  );

  const paths = useMemo(() => {
    if (!projection) return [];

    const rotate = projection.rotate();
    const center: [number, number] = [-rotate[0], -rotate[1]];
    const interpolate = geoInterpolate(from, to);

    // строим точки вдоль большого круга, разбиваем на видимые куски
    const segmentsList: [number, number][][] = [];
    let current: [number, number][] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const point = interpolate(t) as [number, number];
      const visible = geoDistance(point, center) < Math.PI / 2;

      if (visible) {
        current.push(point);
      } else if (current.length > 0) {
        segmentsList.push(current);
        current = [];
      }
    }
    if (current.length > 0) segmentsList.push(current);

    return segmentsList
      .map((seg) => {
        const coords = seg
          .map((p) => projection(p))
          .filter((c): c is [number, number] => c !== null);
        if (coords.length < 2) return null;
        return coords
          .map((c, i) => `${i === 0 ? "M" : "L"}${c[0]},${c[1]}`)
          .join(" ");
      })
      .filter((d): d is string => d !== null);
  }, [projection, from, to, segments]);

  if (paths.length === 0) return null;

  return paths.map((d, i) => (
    <path
      key={i}
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
    />
  ));
}
