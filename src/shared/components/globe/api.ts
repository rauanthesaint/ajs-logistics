import axios from "axios";
import { TopologySchema, type Topology } from "./model/types";
import { useQuery } from "@tanstack/react-query";

const TOPOLOGY_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json";

async function getTopology(): Promise<Topology> {
  const response = await axios.get<unknown>(TOPOLOGY_URL);
  const result = TopologySchema.safeParse(response.data);

  if (!result.success) {
    throw new Error("Invalid topology data", { cause: result.error });
  }

  return result.data;
}

export function useGetTopology() {
  return useQuery({
    queryKey: ["topology"],
    queryFn: getTopology,
    staleTime: Infinity,
    gcTime: 24 * 60 * 60 * 1000,
    retry: 1,
  });
}
