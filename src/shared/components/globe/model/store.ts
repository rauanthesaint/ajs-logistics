import type { GeoProjection } from "d3";

type ProjectionSnapshot = {
  projection: GeoProjection | null;
};

export function createProjectionStore() {
  let snapshot: ProjectionSnapshot = { projection: null };

  const listeners = new Set<() => void>();

  function getSnapshot() {
    return snapshot;
  }

  function setProjection(projection: GeoProjection | null) {
    snapshot = { projection };
    listeners.forEach((listener) => listener());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { getSnapshot, setProjection, subscribe };
}

export type ProjectionStore = ReturnType<typeof createProjectionStore>;
