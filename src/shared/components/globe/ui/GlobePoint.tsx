import { useSyncExternalStore } from "react";
import { geoDistance } from "d3";
import { useGlobeContext } from "../model";
import { motion } from "motion/react";

type GlobePointProps = {
  // lon: number;
  // lat: number;
  coordinates: [number, number];
  radius?: number | string;
  fill?: string;
};

export function GlobePoint({
  // lon,
  // lat,
  coordinates,
  radius = 4,
  fill = "red",
}: GlobePointProps) {
  const store = useGlobeContext();
  const { projection } = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
  );

  if (!projection) return null;

  const rotate = projection.rotate();
  const center: [number, number] = [-rotate[0], -rotate[1]];
  const visible = geoDistance(coordinates, center) < Math.PI / 2;
  if (!visible) return null;

  const coords = projection(coordinates);
  if (!coords) return null;

  const [x, y] = coords;
  return (
    <motion.circle
      viewport={{ once: true }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      cx={x}
      cy={y}
      r={radius}
      fill={fill}
    />
  );
}
