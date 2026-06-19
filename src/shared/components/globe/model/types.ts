import { z } from "zod";

const PositionSchema = z.tuple([z.number(), z.number()]);
const ArcIndexRing = z.array(z.number());

const GeometryPropertiesSchema = z.object({
  name: z.string(),
});

const PolygonGeometrySchema = z.object({
  type: z.literal("Polygon"),
  id: z.union([z.string(), z.number()]).optional(),
  arcs: z.array(ArcIndexRing),
  properties: GeometryPropertiesSchema.optional(),
});

const MultiPolygonGeometrySchema = z.object({
  type: z.literal("MultiPolygon"),
  id: z.union([z.string(), z.number()]).optional(),
  arcs: z.array(z.array(ArcIndexRing)),
  properties: GeometryPropertiesSchema.optional(),
});

const GeometrySchema = z.discriminatedUnion("type", [
  PolygonGeometrySchema,
  MultiPolygonGeometrySchema,
]);

const GeometryCollectionSchema = z.object({
  type: z.literal("GeometryCollection"),
  geometries: z.array(GeometrySchema),
});

const ArcSchema = z.array(PositionSchema);
const BBoxSchema = z.tuple([z.number(), z.number(), z.number(), z.number()]);

const TransformSchema = z.object({
  scale: z.tuple([z.number(), z.number()]),
  translate: z.tuple([z.number(), z.number()]),
});

export const TopologySchema = z.object({
  type: z.literal("Topology"),
  bbox: BBoxSchema.optional(),
  transform: TransformSchema.optional(),
  arcs: z.array(ArcSchema),
  objects: z.object({
    countries: GeometryCollectionSchema,
    land: GeometryCollectionSchema.optional(),
  }),
});

export type Topology = z.infer<typeof TopologySchema>;

export type GlobeOptions = {
  angle?: [number, number] | [number, number, number];
  colors?: Partial<{
    sphere: string | "none";
    graticule: string | "none";
    country: string | "none";
    borders: string | "none";
    highlightCountry: string | "none";
    highlightBorder: string | "none";
  }>;
  mode?: "3d" | "2d";
  highlights?: string[];
};
