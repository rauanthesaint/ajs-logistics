import { createContext, useContext } from "react";
import type { ProjectionStore } from "./store";

export const GlobeContext = createContext<ProjectionStore | null>(null);

export function useGlobeContext() {
  const ctx = useContext(GlobeContext);
  if (!ctx) {
    throw new Error("Globe components must be used inside <Globe>");
  }
  return ctx;
}
